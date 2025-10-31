import { PortableText } from 'next-sanity';
import { portableTextComponents } from '@/lib/formatters/portableText';

interface ProductDescriptionProps {
  description?: unknown;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Descrição do Produto
      </h2>
      <div className="prose max-w-none">
        <PortableText 
          value={description as never}
          components={portableTextComponents}
        />
      </div>
    </div>
  );
}