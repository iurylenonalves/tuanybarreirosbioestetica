import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ServiceCard } from '@/components/cards/ServiceCard';

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

async function getAllProcedures() {
  const query = `*[_type == "procedure"] | order(category asc) {
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

export async function ServiceListSection() {
  const procedures = await getAllProcedures();

  // Group by category
  const groupedProcedures: Record<string, Procedure[]> = {
    consultoria: [],
    facial: [],
    corporal: [],
    terapias_manuais: [],
    remocao: [],
  };

  procedures.forEach((proc: Procedure) => {
    if (groupedProcedures[proc.category]) {
      groupedProcedures[proc.category].push(proc);
    } else {
      // Fallback for unmapped categories
      if (!groupedProcedures['outros']) groupedProcedures['outros'] = [];
      groupedProcedures['outros'].push(proc);
    }
  });

  // Category section configuration (Copywriting)
  const categoryConfig: Record<string, { title: string }> = {
    consultoria: {
      title: 'Consultoria Integrativa',
    },
    facial: {
      title: 'Tratamentos Faciais',
    },
    corporal: {
      title: 'Tratamentos Corporais',
    },
    terapias_manuais: {
      title: 'Terapias Manuais',
    },
    remocao: {
      title: 'Remoção de Tatuagem e Micropigmentação',
    },
  };

  const categoriesToRender = ['consultoria', 'facial', 'corporal', 'terapias_manuais', 'remocao'];

  return (    
    <section id="detalhes-servicos" className="bg-brand-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xl font-semibold uppercase text-brand-dark-nude tracking-widest">
            PROCEDIMENTOS
          </h2>
        </div>

        {/* Rendering Categories */}
        <div className="space-y-20">
          {categoriesToRender.map((catKey) => {
            const items = groupedProcedures[catKey];
            const config = categoryConfig[catKey];

            if (!items || items.length === 0) return null;

            return (
              <div key={catKey} className="border-t border-gray-200 pt-12 first:border-0 first:pt-0">
                <div className="mb-8 text-left md:text-center max-w-4xl mx-auto">
                  <h3 className="font-serif text-3xl font-bold text-gray-800 mb-3">{config.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((proc: Procedure, index: number) => {
                     
                     let imageUrl = '/service-limpeza.jpg';
            
                     if (proc.image?.asset?._ref) {
                       imageUrl = urlFor(proc.image.asset).url();
                     } else if (proc.image?.asset?.url) {
                       imageUrl = proc.image.asset.url;
                     }

                    return (
                      <ServiceCard
                        key={index}
                        category={config.title}
                        title={proc.name}
                        description={proc.shortDescription || ''}
                        imageSrc={imageUrl}
                        linkHref="/agendar"
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}