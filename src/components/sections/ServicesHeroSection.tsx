import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

async function getServicesHeroData() {
  const query = `*[_type == "servicesHero"][0] {
    eyebrow,
    title,
    description
  }`;
  return client.fetch(query);
}

export async function ServicesHeroSection() {
  const data = await getServicesHeroData();

  // Fallback data
  const eyebrow = data?.eyebrow;
  const title = data?.title || 'Nossos serviços';
  const description = data?.description || 'Cada tratamento é uma jornada única de cuidado e transformação pessoal.';

  return (
    <section className="bg-brand-pink-light py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          
          {eyebrow && (
            <span className="text-sm font-semibold uppercase text-brand-dark-nude">
              {eyebrow}
            </span>
          )}

          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-2 text-gray-800">
            {title}
          </h1>
          
          <p className="mt-4 text-lg text-gray-600 whitespace-pre-line">
            {description}
          </p>
          
          {/* Reutilizando nosso componente de Botão padronizado */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/agendar">
              <Button variant="primary">Agendar</Button>
            </Link>
            <Link href="#detalhes-servicos"> {/* Link para uma futura seção na mesma página */}
              <Button variant="secondary">Saiba mais</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}