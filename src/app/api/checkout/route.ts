import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { checkRateLimit } from '@/lib/rateLimit';
import { checkoutSchema, sanitizeString } from '@/lib/validations/schemas';

// Initialize the client with the Access Token (Sandbox or Production)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 }
});

// Initialize the Sanity client with write permissions
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    // Rate Limiting
    // Obtain the client's IP address
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(ip, { maxRequests: 5, windowSeconds: 600 }); // 5 tentativas a cada 10 min

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Por favor, aguarde alguns minutos.' },
        { status: 429 }
      );
    }

    // Receive data from frontend
    const body = await request.json();
    const { items: frontendItems, payer } = body;

    // Client Data Validation (Input Security)
    const validationResult = checkoutSchema.safeParse(payer);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Dados do cliente inválidos.', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Extract sanitized payer data
    const safePayer = {
      name: sanitizeString(payer.name),
      email: sanitizeString(payer.email),
      phone: payer.phone.replace(/\D/g, ''),
      address: sanitizeString(payer.address),
      number: sanitizeString(payer.number),
      neighborhood: sanitizeString(payer.neighborhood),
      city: sanitizeString(payer.city),
      state: sanitizeString(payer.state),
      zipCode: payer.zipCode.replace(/\D/g, '')
    };

    // Determine base URL dynamically
    let origin = '';
    try {
      origin = new URL(request.url).origin;
    } catch (e) {
      origin = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    }

    if (!origin || origin === 'null') {
      origin = 'http://localhost:3000';
    }

    console.log('MP Checkout Origin:', origin);

    // Price and Stock Validation
    // Fetch real products from Sanity to ensure the price is correct
    const itemIds = frontendItems.map((item: any) => item.id);
    
    const sanityItems = await writeClient.fetch(
      `*[_id in $ids]{
        _id,
        _type,
        name,
        price,
        stock,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url),
        "bundleWith": bundleWith[]->_id,
        bundleDiscount
      }`,
      { ids: itemIds }
    );

    // Create a map for quick lookup
    const sanityItemMap = new Map(sanityItems.map((item: any) => [item._id, item]));
    
    // Recalculate items with correct prices and validate stock
    const items = frontendItems.map((frontItem: any) => {
      const realItem = sanityItemMap.get(frontItem.id) as any;
      
      if (!realItem) {
        throw new Error(`Produto não encontrado: ${frontItem.id}`);
      }

      // Stock Validation
      // Only validate stock for physical products
      if (realItem._type === 'product') {
        if (realItem.stock === undefined || realItem.stock === null) {
        }
        
        const currentStock = Number(realItem.stock || 0);
        const requestedQuantity = Number(frontItem.quantity);

        if (currentStock < requestedQuantity) {
          throw new Error(`Estoque insuficiente para o produto "${realItem.name}". Disponível: ${currentStock}, Solicitado: ${requestedQuantity}`);
        }
      }

      let finalPrice = realItem.price;

      // Discount for Bundles
      if (realItem.bundleWith && realItem.bundleDiscount && realItem.bundleWith.length > 0) {
        // Verify if any of the bundled items are in the cart
        const hasBundlePartner = realItem.bundleWith.some((partnerId: string) => 
          frontendItems.some((i: any) => i.id === partnerId)
        );

        if (hasBundlePartner) {
          finalPrice = realItem.price * (1 - realItem.bundleDiscount / 100);
        }
      }

      return {
        id: realItem._id,
        name: realItem.name,
        quantity: Number(frontItem.quantity),
        price: Number(finalPrice.toFixed(2)), // Price calculated from Sanity
        image: realItem.imageUrl
      };
    });

    // Create the Order in Sanity (Status: Pending)
    // Option B: Block the sale if Sanity fails to ensure integrity.
    
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('SANITY_API_WRITE_TOKEN não configurado.');
      return NextResponse.json(
        { error: 'Erro interno: Sistema de pedidos indisponível.' },
        { status: 500 }
      );
    }

    let orderId;

    try {
      const order = await writeClient.create({
        _type: 'order',
        orderNumber: `ORDER-${Date.now()}`,
        customerName: safePayer.name,
        customerEmail: safePayer.email,
        customerPhone: safePayer.phone,
        customerAddress: `${safePayer.address}, ${safePayer.number} - ${safePayer.neighborhood}`,
        customerCity: safePayer.city,
        customerState: safePayer.state,
        customerZipCode: safePayer.zipCode,
        items: items.map((item: any) => ({
          _key: item.id,
          title: item.name,
          quantity: Number(item.quantity),
          price: Number(item.price),
          productId: item.id,
        })),
        total: items.reduce((acc: number, item: any) => acc + (Number(item.price) * Number(item.quantity)), 0),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      orderId = order._id;
      console.log('Pedido criado no Sanity:', orderId);
    } catch (sanityError) {
      console.error('Erro CRÍTICO ao criar pedido no Sanity:', sanityError);
      return NextResponse.json(
        { error: 'Erro ao registrar pedido. Tente novamente em instantes.' },
        { status: 500 }
      );
    }

    // 3. Create Mercado Pago Preference
    const preference = new Preference(client);

    // 4. Configure preference data
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price), // Real price from server
          picture_url: item.image,
          currency_id: 'BRL',
        })),
        payer: {
          email: safePayer.email,
          name: safePayer.name,
          // MP requires phone separated into area code and number
          phone: {
            area_code: safePayer.phone.substring(0, 2),
            number: safePayer.phone.substring(2),
          },
          address: {
            zip_code: safePayer.zipCode,
            street_name: safePayer.address,
            street_number: safePayer.number,
          }
        },
        // Where to redirect after payment
        back_urls: {
          success: `${origin}/checkout/sucesso`,
          failure: `${origin}/checkout`,
          pending: `${origin}/checkout`,
        },
        auto_return: 'approved', // Requires HTTPS in production.
        
        // URL to receive notifications (Webhooks)
        notification_url: `${origin}/api/webhooks/mercadopago`,

        // Identifier on the card statement
        statement_descriptor: 'TUANY BIO',
        
        // External reference: We use the order ID from Sanity
        external_reference: orderId,
      },
    });

    // Return the payment URL (Sandbox) to the Frontend
    return NextResponse.json({ url: result.init_point });

  } catch (error: any) {
    console.error('Erro Mercado Pago:', error);
    
    // Error Handling
    if (error.message && error.message.includes('Estoque insuficiente')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 } // Conflict
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar sessão de pagamento' },
      { status: 500 }
    );
  }
}