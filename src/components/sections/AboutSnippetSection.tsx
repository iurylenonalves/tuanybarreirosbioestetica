import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

async function getAboutSnippetData() {
  const query = `*[_type == "about"][0] {
    name,
    role,
    shortBio,
    image {
      asset->{
        _ref,
        url
      },
      alt
    },
    qualities
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

export async function AboutSnippetSection() {
  const data = await getAboutSnippetData();

  const qualities = data?.qualities || [
    "Atendimento Humanizado e Individual",
    "Foco em Resultados Reais e Naturais",
    "Tecnologia de Ponta e Segurança",
    "Paixão por Cuidado e Bem-estar",
  ];

  const fallbackImage = '/tuany-retrato.jpg';
  
  let imageUrl = fallbackImage;
  if (data?.image?.asset?._ref) {
    imageUrl = urlFor(data.image.asset).url();
  } else if (data?.image?.asset?.url) {
    imageUrl = data.image.asset.url;
  }

  const imageAlt = data?.image?.alt || 'Retrato de Tuany Barreiros';
  const title = data?.name ? `${data.name}: Especialista em Bioestética` : 'Tuany Barreiros: Especialista em Bioestética';
  const description = data?.shortBio || 'Minha missão é ir além da estética, promovendo um encontro entre sua beleza interior e exterior. Com uma abordagem que une ciência, tecnologia e um cuidado profundo, eu crio jornadas de transformação pessoal para cada cliente.';

  return (
    <section className="py-16 md:py-20 bg-brand-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Sobre mim
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        
          {/* Image column */}
          <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              className="transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Text column */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-gray-800">
              {title}
            </h2>
            <p className="mt-4 text-gray-600">
              {description}
            </p>

            <ul className="mt-6 space-y-3">
              {qualities.map((quality: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-brand-dark-nude" />
                  <span className="text-gray-700">{quality}</span>
                </li>
              ))}
            </ul>
          
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <Link href="/sobre">
                <Button variant="secondary">Sobre mim</Button>
              </Link>
              <Link 
                href="/contato" 
                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-brand-brown transition-colors"
              >
                Contato
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}