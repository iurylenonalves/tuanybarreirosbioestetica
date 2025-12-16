import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { checkRateLimit, getClientIP, RateLimitPresets } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  // Origin check - CSRF PROTECTION
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  const allowedOrigins = [
    `http://${host}`,
    `https://${host}`,
    'http://localhost:3000',
    'http://localhost:3333', // Sanity Studio local
    'https://tuanybarreiros.com.br',
    'https://www.tuanybarreiros.com.br',
  ];
  
  // Check origin OR referer (some tools don't send origin)
  const sourceUrl = origin || referer;
  if (sourceUrl && !allowedOrigins.some(allowed => sourceUrl.startsWith(allowed))) {
    return new Response(
      JSON.stringify({ error: 'Origem não autorizada' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Rate limiting
  const clientIP = getClientIP(request);
  const rateLimitResult = checkRateLimit(clientIP, RateLimitPresets.PREVIEW);
  
  if (!rateLimitResult.success) {
    return new Response(JSON.stringify({ 
      error: 'Too many requests',
      limit: rateLimitResult.limit,
      reset: rateLimitResult.reset
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      }
    });
  }
  
  const { searchParams } = new URL(request.url)  
  
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const pathname = searchParams.get('pathname')
  
  // Specific and fixed token for preview
  const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET
  
  // Check secret
  if (!secret || !PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return new Response(JSON.stringify({   
      error: 'Invalid or missing secret'
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Determine redirect path
  let redirectPath = '/'
  
  if (pathname) {
    redirectPath = pathname
  } else if (slug) {
    // If it starts with /, use as is, otherwise add /blog/
    redirectPath = slug.startsWith('/') ? slug : `/blog/${slug}`
  }
  
  redirect(redirectPath)
}