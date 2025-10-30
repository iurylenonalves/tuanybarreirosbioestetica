import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images: Array<{ alt?: string }>;
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  featured?: boolean;
  stock?: number;
}

interface ServicePackage {
  _id: string;
  name: string;
  slug: { current: string };
  image: { alt?: string };
  price: number;
  originalPrice?: number;
  shortDescription?: string;
  popular?: boolean;
  sessions?: number;
  bookingRequired?: boolean;
}

interface ProductCardProps {
  item: (Product | ServicePackage) & { type: 'product' | 'servicePackage' };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export function ProductCard({ item }: ProductCardProps) {
  const isService = item.type === 'servicePackage';
  const link = isService ? `/produtos/servicos/${item.slug.current}` : `/produtos/${item.slug.current}`;
  
  // Determinar imagem baseado no tipo
  const imageUrl = isService 
    ? urlFor((item as ServicePackage).image).width(400).height(400).url()
    : urlFor((item as Product).images[0]).width(400).height(400).url();
  
  const imageAlt = isService 
    ? (item as ServicePackage).image.alt || item.name
    : (item as Product).images[0].alt || item.name;

  // Determinar preços baseado no tipo
  const currentPrice = item.price;
  const originalPrice = isService 
    ? (item as ServicePackage).originalPrice 
    : (item as Product).compareAtPrice;

  // Determinar badges
  const isPopular = isService ? (item as ServicePackage).popular : (item as Product).featured;
  const stockInfo = !isService && (item as Product).stock !== undefined 
    ? (item as Product).stock 
    : null;

  return (
    <Link href={link} className="group">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Imagem com aspect ratio fixo */}
        <div className="relative aspect-square w-full bg-gray-100">
          <Image 
            src={imageUrl}
            alt={imageAlt}
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          
          {/* Badges no canto superior */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* Badge de tipo */}
            <span className="bg-brand-pink-light text-brand-text-button px-2 py-1 rounded-full text-xs font-semibold border border-brand-dark-nude/20">
              {isService ? 'Pacote' : 'Produto'}
            </span>
            
            {/* Badge de destaque */}
            {isPopular && (
              <span className="bg-brand-text-button text-white px-2 py-1 rounded-full text-xs font-semibold">
                {isService ? 'Mais Procurado' : 'Destaque'}
              </span>
            )}
          </div>

          {/* Badge de estoque baixo (apenas produtos) */}
          {stockInfo !== null && stockInfo !== undefined && stockInfo < 5 && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {stockInfo === 0 ? 'Esgotado' : `${stockInfo} restantes`}
              </span>
            </div>
          )}
        </div>

        {/* Conteúdo do card */}
        <div className="p-4 flex flex-col grow">
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-text-button transition-colors line-clamp-2">
            {item.name}
          </h3>
          
          {item.shortDescription && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 grow">
              {item.shortDescription}
            </p>
          )}

          {/* Informações adicionais para serviços */}
          {isService && (item as ServicePackage).sessions && (
            <div className="mb-3">
              <span className="text-xs text-gray-500 bg-brand-off-white px-2 py-1 rounded border border-brand-dark-nude/20">
                {(item as ServicePackage).sessions} sessões
              </span>
            </div>
          )}
          
          {/* Preços sempre no final */}
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-brand-text-button">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Indicador de ação */}
              <div className="text-brand-text-button opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}