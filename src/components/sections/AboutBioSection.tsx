import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

interface Stat {
  label: string;
  value: string;
}

async function getAboutData() {
  const query = `*[_type == "about"][0] {
    name,
    role,
    bio,
    image {
      asset->{
        _ref,
        url
      },
      alt
    },
    stats[] {
      label,
      value
    }
  }`;
  return client.fetch(query);
}

export async function AboutBioSection() {
  const data = await getAboutData();

  // Fallback data
  const fallbackImage = '/tuany-retrato.jpg';
  
  let imageUrl = fallbackImage;
  if (data?.image?.asset?._ref) {
    imageUrl = urlFor(data.image.asset).url();
  } else if (data?.image?.asset?.url) {
    imageUrl = data.image.asset.url;
  }

  const imageAlt = data?.image?.alt || 'Tuany Barreiros em seu consultório';
  
  const stats = data?.stats || [
    { label: 'Experiência', value: 'Anos de prática profissional dedicada.' },
    { label: 'Abordagem', value: 'Cuidado personalizado que respeita a beleza individual.' }
  ];

  return (
    <section id="minha-jornada" className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text column */}
          <div className="text-center md:text-left">
            <span className="text-sm font-semibold uppercase text-brand-dark-nude">
              Quem sou
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800 leading-tight">
              Minha jornada na bioestética
            </h2>
            
            <div className="mt-4 text-lg text-gray-600 prose prose-brand">
              {data?.bio ? (
                <PortableText value={data.bio} />
              ) : (
                <p>Eu crio beleza com precisão e compaixão. Cada tratamento conta uma história de transformação e autodescoberta.</p>
              )}
            </div>

            {/* Highlights subsection */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {stats.map((stat: Stat, index: number) => (
                <div key={index}>
                  <h3 className="font-serif text-4xl font-bold text-gray-800">{stat.label}</h3>
                  <p className="mt-2 text-gray-600">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <Link 
                href="/procedimentos"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Saiba mais
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

          {/* Image column */}
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}