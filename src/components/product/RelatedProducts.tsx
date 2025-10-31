import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PriceDisplay } from '@/components/shared/PriceDisplay';

interface RelatedProduct {
  _id: string;
  name: string;
  slug: { current: string };
  images: Array<{ alt?: string }>;
  price: number;
  compareAtPrice?: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
        Produtos Relacionados
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/produtos/${product.slug.current}`}
            className="group"
          >
            <div className="bg-white border border-brand-dark-nude/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <Image
                  src={urlFor(product.images[0]).width(250).height(250).url()}
                  alt={product.images[0].alt || product.name}
                  width={250}
                  height={250}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-text-button transition-colors">
                  {product.name}
                </h3>
                <PriceDisplay 
                  price={product.price} 
                  originalPrice={product.compareAtPrice} 
                  size="sm" 
                  showDiscount={false}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}