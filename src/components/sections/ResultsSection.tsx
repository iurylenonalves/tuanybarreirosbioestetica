import { ResultsCarousel, ResultSlide } from '@/components/ui/ResultsCarousel';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

async function getResults() {
  return client.fetch(
    groq`*[_type == "results"][0]{
      title,
      description,
      images[]{
        "src": asset->url,
        "alt": coalesce(alt, "Resultado Tuany Bioestética"),
        caption
      }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function ResultsSection() {
  const data = await getResults();

    // Fallback if there is no data in Sanity yet
  if (!data || !data.images) {
    return null; 
  }

  return (
    <section id="resultados" className="bg-brand-background py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Column */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
              {data.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {data.description}
            </p>
          </div>

          {/* Carousel Column */}
          <div>
            <ResultsCarousel slides={data.images} />
          </div>

        </div>
      </div>
    </section>
  );
}