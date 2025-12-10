import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

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
    // 1. Recebe os dados do Frontend
    const body = await request.json();
    const { items, payer } = body;

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

    // 2. Cria o Pedido no Sanity (Status: Pendente)
    let orderId = `ORDER-${Date.now()}`; // Fallback caso Sanity falhe ou sem token
    
    if (process.env.SANITY_API_WRITE_TOKEN) {
      try {
        const order = await writeClient.create({
          _type: 'order',
          orderNumber: orderId,
          customerName: payer.name,
          customerEmail: payer.email,
          customerPhone: payer.phone,
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
        console.error('Erro ao criar pedido no Sanity:', sanityError);
        // Não bloqueia o checkout se o Sanity falhar, mas loga o erro
      }
    } else {
      console.warn('SANITY_API_WRITE_TOKEN não configurado. Pedido não será salvo no Sanity.');
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
          email: payer.email,
          name: payer.name,
          // O MP pede telefone separado em área e número
          phone: {
            area_code: payer.phone.substring(0, 2),
            number: payer.phone.substring(2),
          },
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