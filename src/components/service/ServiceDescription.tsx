import { PortableText } from 'next-sanity';
import { portableTextComponents } from '@/lib/formatters/portableText';

interface ServiceDescriptionProps {
  description?: unknown;
}

export function ServiceDescription({ description }: ServiceDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Sobre o Tratamento
      </h2>
      <div className="prose max-w-none bg-white rounded-2xl p-8 shadow-lg border border-brand-dark-nude/20">
        <PortableText 
          value={description as never}
          components={portableTextComponents}
        />
      </div>
    </div>
  );
}