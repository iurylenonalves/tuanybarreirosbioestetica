import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PriceDisplay } from '@/components/shared/PriceDisplay';

interface RelatedService {
  _id: string;
  name: string;
  slug: { current: string };
  image: { alt?: string };
  price: number;
  popular?: boolean;
}

interface RelatedServicesProps {
  services: RelatedService[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
        Outros Tratamentos
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/produtos/servicos/${service.slug.current}`}
            className="group"
          >
            <div className="bg-white border border-brand-dark-nude/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-4/3">
                <Image
                  src={urlFor(service.image).width(300).height(225).url()}
                  alt={service.image.alt || service.name}
                  width={300}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-text-button transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center justify-between">
                  <PriceDisplay 
                    price={service.price} 
                    size="sm" 
                    showDiscount={false}
                  />
                  {service.popular && (
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}