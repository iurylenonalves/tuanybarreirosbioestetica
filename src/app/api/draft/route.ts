import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Parâmetros possíveis
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const pathname = searchParams.get('pathname')
  
  // Token específico e fixo para preview
  const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'tuany-preview-2024-secret'
  
  // Log para debug
  console.log('Preview request:', {
    secret: secret?.substring(0, 10) + '...',
    slug,
    pathname
  })
  
  // Verificar secret
  if (!secret || secret !== PREVIEW_SECRET) {
    return new Response(JSON.stringify({ 
      error: 'Invalid or missing secret',
      expected: PREVIEW_SECRET.substring(0, 10) + '...'
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
  
  console.log('Preview habilitado, redirecionando para:', redirectPath)
  
  // Redirecionar (não envolver em try/catch)
  redirect(redirectPath)
}