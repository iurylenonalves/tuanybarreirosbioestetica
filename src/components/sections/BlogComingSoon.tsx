import Link from 'next/link';
import { Feather } from 'lucide-react';

export function BlogComingSoon() {
  return (
    <section className="bg-brand-background py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Feather size={48} className="mx-auto text-brand-brown" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-6 text-gray-800">
            Nosso Blog está a caminho
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Em breve, você encontrará aqui dicas de cuidados, novidades sobre tratamentos e tudo sobre o universo do bem-estar e da bioestética. Estamos preparando um conteúdo exclusivo para você!
          </p>
          <div className="mt-8">
            <Link 
              href="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
            >
              Voltar para a Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}