import { ImageCarousel, Slide } from '@/components/ui/ImageCarousel';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface SanityImage {
  asset: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
  title?: string;
  description?: string;
}

async function getHeroData() {
  const query = `*[_type == "hero"][0] {
    title,
    subtitle,
    carouselImages[] {
      asset->{
        _ref,
        url
      },
      alt,
      title,
      description
    },
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink
  }`;
  return client.fetch(query);
}

export async function HeroSection() {
  const data = await getHeroData();

  // Fallback data if Sanity is empty (so the site doesn't break while empty)
  const fallbackSlides: Slide[] = [
    {
      src: '/hero-image.jpg',
      alt: 'Tratamentos Faciais',
      title: 'Tratamentos Faciais Personalizados',
      description: 'Cuidado profundo para uma pele radiante e saudável.',
    },
    {
      src: '/service-limpeza.jpg',
      alt: 'Tecnologia e Bem-estar',
      title: 'Tecnologia e Bem-estar',
      description: 'Utilizamos equipamentos de ponta para resultados incríveis.',
    },
    {
      src: '/service-nutricao.jpg',
      alt: 'Cuidado que Transforma',
      title: 'Cuidado que Transforma',
      description: 'Uma jornada única de autoconfiança e beleza.',
    },
  ];

  const slides: Slide[] = data?.carouselImages?.map((img: SanityImage) => {
    let imageUrl = '/hero-image.jpg'; // Fallback padrão

    if (img.asset?._ref) {
      imageUrl = urlFor(img.asset).url();
    } else if (img.asset?.url) {
      imageUrl = img.asset.url;
    }

    return {
      src: imageUrl,
      alt: img.alt || '',
      title: img.title,
      description: img.description,
    };
  }) || fallbackSlides;

  const title = data?.title || 'Bioestética que valoriza sua beleza natural';
  const subtitle = data?.subtitle || 'Transforme sua pele com cuidados personalizados. Cada tratamento é uma jornada única de autoconfiança e bem-estar.';
  const ctaText = data?.ctaText || 'Agendar';
  const ctaLink = data?.ctaLink || '/agendar';
  const secondaryCtaText = data?.secondaryCtaText || 'Saiba mais';
  const secondaryCtaLink = data?.secondaryCtaLink || '/sobre';

  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Coluna de Texto */}
        <div className="text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                {title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 whitespace-pre-line">
                {subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href={ctaLink}>
                <Button variant="primary">{ctaText}</Button>
              </Link>
              <Link href={secondaryCtaLink}>
                <Button variant="secondary">{secondaryCtaText}</Button>
              </Link>
            </div>
        </div>
        
        {/* Coluna da Direita */}
        <div>
          <ImageCarousel slides={slides} />
        </div>

      </div>
    </section>
  );
}