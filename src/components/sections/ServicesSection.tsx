import { ServiceCard } from '@/components/cards/ServiceCard';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Procedure {
  name: string;
  category: string;
  shortDescription?: string;
  image?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
    alt?: string;
  };
}

async function getProcedures() {
  // Filtra apenas os destacados (featured == true) e limita a 3 itens
  const query = `*[_type == "procedure" && featured == true][0...3] | order(_createdAt desc) {
    name,
    category,
    shortDescription,
    image {
      asset->{
        _ref,
        url
      },
      alt
    }
  }`;
  return client.fetch(query);
}

export async function ServicesSection() {
  const procedures = await getProcedures();

  // Fallback data if Sanity is empty
  const fallbackProcedures = [
    {
      category: 'facial',
      name: 'Limpeza de Pele',
      shortDescription: 'Removemos impurezas e revitalizamos sua pele.',
      image: { asset: { url: '/service-limpeza.jpg' } },
    },
    {
      category: 'terapias_manuais',
      name: 'Massagem Relaxante',
      shortDescription: 'Alivie o estresse e relaxe a musculatura.',
      image: { asset: { url: '/service-peeling.jpg' } },
    },
    {
      category: 'corporal',
      name: 'Drenagem Linfática',
      shortDescription: 'Reduza medidas e elimine a retenção de líquidos.',
      image: { asset: { url: '/service-nutricao.jpg' } },
    },
  ];

  const displayProcedures = procedures.length > 0 ? procedures : fallbackProcedures;

  // Helper to map category values to display names
  const categoryNames: Record<string, string> = {
    facial: 'Faciais',
    corporal: 'Corporais',
    terapias_manuais: 'Terapias Manuais',
    consultoria: 'Consultoria Integrativa',
  };

  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        
        {/* Bloco de Título */}
        <span className="text-sm font-semibold uppercase text-brand-dark-nude">
          Procedimentos
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-gray-800">
          Nossos Procedimentos
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Protocolos completos para estimular colágeno, redefinir contornos e preservar a firmeza.
        </p>

        {/* Grid de Serviços */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProcedures.map((proc: Procedure, index: number) => {
            // Lógica segura para resolver a URL da imagem
            let imageUrl = '/service-limpeza.jpg'; // Fallback padrão
            
            if (proc.image?.asset?._ref) {
              // Se tiver referência do Sanity, usa o urlFor
              imageUrl = urlFor(proc.image.asset).url();
            } else if (proc.image?.asset?.url) {
              // Se for o fallback local (que tem a propriedade .url direta)
              imageUrl = proc.image.asset.url;
            }

            return (
              <ServiceCard
                key={index}
                category={categoryNames[proc.category] || proc.category}
                title={proc.name}
                description={proc.shortDescription || ''}
                imageSrc={imageUrl}
                linkHref="/agendar"
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}