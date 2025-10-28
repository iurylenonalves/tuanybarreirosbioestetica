import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Desabilitar draft mode
  const draft = await draftMode()
  draft.disable()

  console.log('Draft mode desabilitado')

  // Redirecionar para home ou para onde o usuário estava
  const referer = request.headers.get('referer')
  const redirectUrl = referer || '/'
  
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}