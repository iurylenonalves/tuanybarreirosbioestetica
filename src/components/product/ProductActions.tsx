import Link from 'next/link';
import Image from 'next/image';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: Array<{ asset?: { _ref: string; url?: string }; alt?: string }>;
  slug: { current: string };
  stock?: number;
  bundleWith?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    images: Array<{
      asset: {
        _ref: string;
        url?: string;
      };
      alt?: string;
    }>;
  }>;
  bundleDiscount?: number;
}

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const isOutOfStock = product.stock === 0;
  const hasBundle = product.bundleWith && product.bundleWith.length > 0 && product.bundleDiscount;

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Bundle Deal Section */}
      {hasBundle && product.bundleWith && (
        <div className="bg-brand-pink-light/30 border border-brand-pink-light rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-brand-text-button text-white text-xs font-bold px-2 py-1 rounded-full">
              OFERTA ESPECIAL
            </span>
            <span className="text-sm font-medium text-brand-text-button">
              Economize {product.bundleDiscount}% comprando junto!
            </span>
          </div>
          
          {product.bundleWith.map((bundleItem) => (
            <div key={bundleItem._id} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                {bundleItem.images?.[0]?.asset ? (
                  <Image
                    src={urlFor(bundleItem.images[0]).width(100).height(100).url()}
                    alt={bundleItem.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                    Sem foto
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{bundleItem.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 line-through">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price + bundleItem.price)}
                  </span>
                  <span className="text-sm font-bold text-brand-text-button">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      (product.price * (1 - (product.bundleDiscount || 0) / 100)) + bundleItem.price
                    )}
                  </span>
                </div>
              </div>

              <AddToCartButton
                item={{
                  id: bundleItem._id,
                  name: bundleItem.name,
                  price: bundleItem.price,
                  image: bundleItem.images?.[0]?.asset ? urlFor(bundleItem.images[0]).width(100).height(100).url() : '',
                  type: 'product',
                  slug: bundleItem.slug.current
                }}
                className="p-2 text-xs whitespace-nowrap"
              >
                Adicionar +
              </AddToCartButton>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {isOutOfStock ? (
          <button
            disabled
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Produto Esgotado
          </button>
        ) : (
          <AddToCartButton
            item={{
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.images?.[0]?.asset ? urlFor(product.images[0]).width(100).height(100).url() : '',
              type: 'product',
              slug: product.slug.current,
              stock: product.stock,
              bundleWith: product.bundleWith?.map(p => p._id),
              bundleDiscount: product.bundleDiscount
            }}
            className="w-full py-4 px-6 text-lg"
          />
        )}
        
        <Link
          href="/contato"
          className="w-full py-3 px-6 border-2 border-brand-text-button text-brand-text-button rounded-lg font-semibold text-center hover:bg-brand-pink-light transition-colors"
        >
          Tirar Dúvidas
        </Link>
      </div>
    </div>
  );
}