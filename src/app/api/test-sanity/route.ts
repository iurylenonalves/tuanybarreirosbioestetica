import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export async function GET() {
  try {
    const token = process.env.SANITY_API_WRITE_TOKEN;
    
    if (!token) {
      return NextResponse.json({ status: 'error', message: 'Token não encontrado nas variáveis de ambiente.' }, { status: 500 });
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });

    // Tenta criar um pedido de teste
    const doc = await client.create({
      _type: 'order',
      orderNumber: `TEST-${Date.now()}`,
      customerName: 'Teste de Conexão',
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: 'success', message: 'Pedido de teste criado com sucesso!', docId: doc._id });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message, stack: error.stack }, { status: 500 });
  }
}
