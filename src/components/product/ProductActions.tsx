import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: Array<{ alt?: string }>;
  slug: { current: string };
  stock?: number;
}

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col gap-3 mb-8">
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
            image: product.images?.[0] ? urlFor(product.images[0]).width(100).height(100).url() : '',
            type: 'product',
            slug: product.slug.current,
            stock: product.stock
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
  );
}