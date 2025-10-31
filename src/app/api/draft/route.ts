import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP, RateLimitPresets } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
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
  
  // Parâmetros possíveis
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const pathname = searchParams.get('pathname')
  
  // Token específico e fixo para preview
  const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET
  
  // Verificar secret
  if (!secret || !PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return new Response(JSON.stringify({ 
      error: 'Invalid or missing secret'
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Habilitar draft mode
  const draft = await draftMode()
  draft.enable()

  // Determinar caminho de redirecionamento
  let redirectPath = '/'
  
  if (pathname) {
    redirectPath = pathname
  } else if (slug) {
    // Se começar com /, usar como está, senão adicionar /blog/
    redirectPath = slug.startsWith('/') ? slug : `/blog/${slug}`
  }
  
  // Redirecionar (não envolver em try/catch)
  redirect(redirectPath)
}