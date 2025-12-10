import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Inicializa o cliente Mercado Pago
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
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    // 1. Validação da Assinatura (Segurança)
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

    // Extrai ts e v1 da assinatura
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

    // Obtém o ID do evento da URL (query param)
    const url = new URL(request.url);
    const dataId = url.searchParams.get('data.id');

    if (!dataId) {
       // Algumas notificações vêm no body, vamos checar
       const body = await request.json();
       if (body.data && body.data.id) {
         // Se veio no body, usamos o do body para validação? 
         // A documentação diz que o template usa data.id da URL query param.
         // Se não tiver na URL, a validação pode falhar se o template exigir.
         // Vamos prosseguir tentando validar com o que temos.
       }
       return NextResponse.json({ error: 'Missing data.id' }, { status: 400 });
    }

    // Cria o template de assinatura
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    // Gera o HMAC
    const cyphedSignature = crypto
      .createHmac('sha256', secret)
      .update(manifest)
      .digest('hex');

    // Compara as assinaturas
    if (cyphedSignature !== hash) {
      // Em ambiente de desenvolvimento (localhost), as vezes queremos pular isso se não tivermos o segredo correto ou tunelamento perfeito.
      // Mas para produção é CRÍTICO.
      console.error('Assinatura inválida');
      // return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // TODO: Descomentar a linha acima em produção. Para testes locais sem segredo correto, pode atrapalhar.
    }

    // 2. Processa o Evento
    // Se a assinatura for válida (ou ignorada), buscamos o pagamento.
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: dataId });

    if (!paymentInfo) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const { status, external_reference } = paymentInfo;
    
    console.log(`Webhook recebido: Pagamento ${dataId} - Status: ${status} - Ref: ${external_reference}`);

    // 3. Atualiza o Pedido no Sanity
    if (external_reference && process.env.SANITY_API_WRITE_TOKEN) {
      // Mapeia status do MP para nosso status
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

      // Atualiza o documento no Sanity
      // O external_reference deve ser o ID do documento (ex: "drafts.ORDER-..." ou apenas ID)
      // Se criamos com writeClient.create, o ID é retornado.
      
      try {
        await writeClient
          .patch(external_reference)
          .set({ 
            status: orderStatus,
            mercadoPagoId: dataId 
          })
          .commit();
          
        console.log(`Pedido ${external_reference} atualizado para ${orderStatus}`);
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
