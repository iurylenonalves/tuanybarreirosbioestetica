import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Origin check - CSRF PROTECTION
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

  // Disable draft mode
  const draft = await draftMode();
  draft.disable();

  // Redirect to home or where the user was
  const redirectUrl = referer || '/'
  
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}