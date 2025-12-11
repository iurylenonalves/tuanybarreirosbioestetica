import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { checkRateLimit } from '@/lib/rateLimit';
import { checkoutSchema, sanitizeString } from '@/lib/validations/schemas';

// Inicializa o cliente com o Token de Acesso (Sandbox ou Produção)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 }
});

// Inicializa o cliente Sanity com permissão de escrita
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Necessário criar este token no painel do Sanity
});

export async function POST(request: Request) {
  try {
    // 0. Rate Limiting (Segurança contra Spam)
    // Obtém o IP do cliente (funciona na Vercel e localmente)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(ip, { maxRequests: 5, windowSeconds: 600 }); // 5 tentativas a cada 10 min

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Por favor, aguarde alguns minutos.' },
        { status: 429 }
      );
    }

    // 1. Recebe os dados do Frontend
    const body = await request.json();
    const { items: frontendItems, payer } = body;

    // 1.0 Validação de Dados do Cliente (Segurança de Input)
    const validationResult = checkoutSchema.safeParse(payer);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Dados do cliente inválidos.', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Sanitização extra (embora o Zod já ajude, garantimos que não entra HTML)
    const safePayer = {
      name: sanitizeString(payer.name),
      email: sanitizeString(payer.email),
      phone: payer.phone.replace(/\D/g, ''), // Apenas números
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

    // 1.1 Validação de Preço no Servidor (Segurança)
    // Busca os produtos reais no Sanity para garantir que o preço está correto
    const itemIds = frontendItems.map((item: any) => item.id);
    
    const sanityItems = await writeClient.fetch(
      `*[_id in $ids]{
        _id,
        _type,
        name,
        price,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url),
        "bundleWith": bundleWith[]->_id,
        bundleDiscount
      }`,
      { ids: itemIds }
    );

    // Cria um mapa para acesso rápido aos dados do Sanity
    const sanityItemMap = new Map(sanityItems.map((item: any) => [item._id, item]));
    
    // Recalcula os itens com os dados confiáveis do servidor
    const items = frontendItems.map((frontItem: any) => {
      const realItem = sanityItemMap.get(frontItem.id) as any;
      
      if (!realItem) {
        throw new Error(`Produto não encontrado: ${frontItem.id}`);
      }

      let finalPrice = realItem.price;

      // Lógica de Desconto (Compre Junto)
      if (realItem.bundleWith && realItem.bundleDiscount && realItem.bundleWith.length > 0) {
        // Verifica se algum dos produtos do combo está no carrinho
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
        price: Number(finalPrice.toFixed(2)), // Preço calculado no servidor
        image: realItem.imageUrl
      };
    });

    // 2. Cria o Pedido no Sanity (Status: Pendente)
    // Opção B: Bloqueia a venda se o Sanity falhar para garantir integridade.
    
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

    // 3. Cria a instância de Preferência
    const preference = new Preference(client);

    // 4. Configura a venda
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price), // O MP espera o preço em Reais (float)
          picture_url: item.image,
          currency_id: 'BRL',
        })),
        payer: {
          email: safePayer.email,
          name: safePayer.name,
          // O MP pede telefone separado em área e número
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
        // Para onde o usuário volta depois de pagar
        back_urls: {
          success: `${origin}/checkout/sucesso`,
          failure: `${origin}/checkout`,
          pending: `${origin}/checkout`,
        },
        auto_return: 'approved', // Requer HTTPS em produção.
        
        // URL para receber notificações (Webhooks)
        // Nota: Localhost não recebe webhooks sem túnel (ngrok). Em produção funcionará.
        notification_url: `${origin}/api/webhooks/mercadopago`,

        // Identificador no extrato do cartão
        statement_descriptor: 'TUANY BIO',
        
        // Referência externa: Usamos o ID do pedido no Sanity
        external_reference: orderId,
      },
    });

    // 5. Retorna a URL de pagamento (Sandbox) para o Frontend
    return NextResponse.json({ url: result.init_point });

  } catch (error) {
    console.error('Erro Mercado Pago:', error);
    return NextResponse.json(
      { error: 'Erro ao criar sessão de pagamento' },
      { status: 500 }
    );
  }
}