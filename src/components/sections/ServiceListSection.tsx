import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ServiceCarousel } from '@/components/ui/ServiceCarousel';
import { getWhatsAppLink, MESSAGES } from '@/lib/whatsapp';

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
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

export async function ServiceListSection() {
  const procedures = await getAllProcedures();

  // Group by category
  const groupedProcedures: Record<string, Procedure[]> = {
    consultoria: [],
    facial: [],
    corporal: [],
    terapias_manuais: [],
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
      title: 'Consultorias',
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
  };

  const categoriesToRender = ['consultoria', 'facial', 'corporal', 'terapias_manuais'];
  // Adjusted cycle to ensure Terapias Manuais (index 3) gets pink-light
  const bgColors = ['bg-brand-background', 'bg-brand-pink-light', 'bg-brand-off-white', 'bg-brand-pink-light'];

  return (    
    <>
      {/* Title Section */}
      <section id="detalhes-servicos" className="bg-brand-background pt-16 md:pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold uppercase text-brand-dark-nude tracking-widest">
              PROCEDIMENTOS
            </h2>
          </div>
        </div>
      </section>

      {/* Categories Sections */}
      {categoriesToRender.map((catKey, index) => {
        const items = groupedProcedures[catKey];
        const config = categoryConfig[catKey];

        if (!items || items.length === 0) return null;

        // Determine background color based on index
        const bgColor = bgColors[index % bgColors.length];

        // Prepare items for carousel
        const carouselItems = items.map((proc) => {
          let imageUrl = '/service-limpeza.jpg';
          if (proc.image?.asset?._ref) {
            imageUrl = urlFor(proc.image.asset).url();
          } else if (proc.image?.asset?.url) {
            imageUrl = proc.image.asset.url;
          }

          return {
            category: config.title,
            title: proc.name,
            description: proc.shortDescription || '',
            imageSrc: imageUrl,
            linkHref: getWhatsAppLink(MESSAGES.procedimento(proc.name))
          };
        });

        return (
          <section key={catKey} className={`${bgColor} py-16 md:py-20 border-t border-brand-dark-nude/10`}>
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center max-w-4xl mx-auto">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {config.title}
                </h3>
              </div>

              <ServiceCarousel items={carouselItems} />
            </div>
          </section>
        );
      })}
    </>
  );
}