import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Verificação de Origem - PROTEÇÃO CSRF
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  const allowedOrigins = [
    `http://${host}`,
    `https://${host}`,
    'http://localhost:3000',
  ];
  
  const sourceUrl = origin || referer;
  if (sourceUrl && !allowedOrigins.some(allowed => sourceUrl.startsWith(allowed))) {
    return new Response('Origem não autorizada', { status: 403 });
  }

  // Desabilitar draft mode
  const draft = await draftMode();
  draft.disable();

  // Redirecionar para home ou para onde o usuário estava
  const redirectUrl = referer || '/'
  
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}