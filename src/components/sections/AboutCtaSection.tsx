import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AboutCtaSection() {
  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Pronta para sua Transformação pessoal
          </h2>
          
          <p className="mt-4 text-lg text-gray-600">
            Sua jornada para a beleza natural e bem-estar começa com um passo único e confiante.
          </p>

          {/* Botões - usando os estilos da seção "Sobre" */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contato">
              <Button variant="primary">Agendar</Button>
            </Link>
            <Link href="/contato">
              <Button variant="secondary">Contato</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}