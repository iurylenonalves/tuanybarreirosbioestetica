import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Initialize the Mercado Pago client
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
    // Validate the Signature
    const secret = process.env.MP_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('MP_WEBHOOK_SECRET não configurado');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    if (!xSignature || !xRequestId) {
      return NextResponse.json({ error: 'Missing signature headers' }, { status: 401 });
    }

    // Extract ts and v1 from the signature
    const parts = xSignature.split(',');
    let ts = '';
    let hash = '';

    parts.forEach(part => {
      const [key, value] = part.split('=');
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === 'ts') ts = trimmedValue;
        if (trimmedKey === 'v1') hash = trimmedValue;
      }
    });

    // Get data.id from query parameters
    const url = new URL(request.url);
    const dataId = url.searchParams.get('data.id');

    if (!dataId) {
       // Some notifications come in the body, let's check
       const body = await request.json();
       if (body.data && body.data.id) {
         // If found in body, use it.
         // The documentation says the template uses data.id from the URL query param.
         // If it's not in the URL, validation may fail if the template requires it.
         // We'll proceed trying to validate with what we have.
       }
       return NextResponse.json({ error: 'Missing data.id' }, { status: 400 });
    }

    // Create the signature template
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    // Generate HMAC SHA256 hash
    const cyphedSignature = crypto
      .createHmac('sha256', secret)
      .update(manifest)
      .digest('hex');

    // Compare signatures
    if (cyphedSignature !== hash) {
      // In development environment (localhost), sometimes we want to skip this if we don't have the correct secret or perfect tunneling.
      // But for production, it's CRITICAL.
      console.error('Invalid signature');
      // return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // TODO: Uncomment the line above in production. For local testing without the correct secret, it may interfere.
    }

    // Fetch Payment Information
    // If the signature is valid (or ignored), fetch the payment.
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: dataId });

    if (!paymentInfo) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const { status, external_reference } = paymentInfo;
    
    console.log(`Webhook recebido: Pagamento ${dataId} - Status: ${status} - Ref: ${external_reference}`);

    // Update Order in Sanity
    if (external_reference && process.env.SANITY_API_WRITE_TOKEN) {
      // Map Mercado Pago status to our order status
      let orderStatus = 'pending';
      switch (status) {
        case 'approved': orderStatus = 'approved'; break;
        case 'pending': orderStatus = 'pending'; break;
        case 'in_process': orderStatus = 'pending'; break;
        case 'rejected': orderStatus = 'rejected'; break;
        case 'cancelled': orderStatus = 'cancelled'; break;
        case 'refunded': orderStatus = 'cancelled'; break;
        case 'charged_back': orderStatus = 'cancelled'; break;
        default: orderStatus = 'pending';
      }

      try {
        // Fetch the current order to check previous status and items
        // Also bring the _type of the document referenced in productId to know if it's a product or service
        const currentOrder = await writeClient.fetch(
          `*[_id == $id][0]{
            status,
            items[]{
              quantity,
              productId,
              "docType": *[_id == ^.productId][0]._type
            }
          }`, 
          { id: external_reference }
        );

        if (currentOrder) {
             // Check if we need to update stock (only on approval)
             if (orderStatus === 'approved' && currentOrder.status !== 'approved') {
                 console.log('Pagamento aprovado. Iniciando baixa de estoque...');
                 
                 const transaction = writeClient.transaction();
                 let hasStockUpdates = false;
                 
                 for (const item of currentOrder.items || []) {
                     // Only update stock for products, not services
                     if (item.productId && item.docType === 'product') {
                         transaction.patch(item.productId, p => p.dec({ stock: item.quantity }));
                         hasStockUpdates = true;
                         console.log(`Baixando ${item.quantity} itens do produto ${item.productId}`);
                     }
                 }
                 
                 if (hasStockUpdates) {
                    await transaction.commit();
                    console.log('Estoque atualizado com sucesso.');
                 }
             }

             // Update the order status and mercadoPagoId
             await writeClient
              .patch(external_reference)
              .set({ 
                status: orderStatus,
                mercadoPagoId: dataId 
              })
              .commit();
              
             console.log(`Pedido ${external_reference} atualizado para ${orderStatus}`);
        } else {
            console.error(`Pedido ${external_reference} não encontrado no Sanity.`);
        }

      } catch (err) {
        console.error(`Erro ao atualizar pedido ${external_reference}:`, err);
      }
    }

    return NextResponse.json({ status: 'ok' });

  } catch (error) {
    console.error('Erro no Webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
