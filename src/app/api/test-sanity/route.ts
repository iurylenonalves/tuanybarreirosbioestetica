import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export async function GET() {
  try {
    const token = process.env.SANITY_API_WRITE_TOKEN;
    
    if (!token) {
      return NextResponse.json({ status: 'error', message: 'Token não encontrado nas variáveis de ambiente.' }, { status: 500 });
    }

    // Debug info (show only first 5 chars of token)
    const tokenStart = token.substring(0, 5);
    const tokenLength = token.length;
    console.log(`Testando Sanity com ProjectID: ${projectId}, Dataset: ${dataset}, Token: ${tokenStart}... (${tokenLength} chars)`);

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });

    // Try to create a test document
    const doc = await client.create({
      _type: 'order',
      orderNumber: `TEST-${Date.now()}`,
      customerName: 'Teste de Conexão',
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: 'success', message: 'Pedido de teste criado com sucesso!', docId: doc._id });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: error.message, 
      stack: error.stack,
      debug: {
        projectId,
        dataset,
        tokenPrefix: process.env.SANITY_API_WRITE_TOKEN ? process.env.SANITY_API_WRITE_TOKEN.substring(0, 4) : 'N/A'
      }
    }, { status: 500 });
  }
}
