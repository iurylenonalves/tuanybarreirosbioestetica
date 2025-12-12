import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-serif font-bold text-brand-brown/20 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold text-brand-brown mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">
              Voltar para o Início
            </Button>
          </Link>
          <Link href="/produtos">
            <Button variant="secondary">
              Ver Produtos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
