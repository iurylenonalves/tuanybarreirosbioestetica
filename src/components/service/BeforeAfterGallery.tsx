import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface BeforeAfterImage {
  asset?: {
    _ref: string;
    url?: string;
  };
  alt?: string;
}

interface BeforeAfterComparison {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  description?: string;
}

interface BeforeAfterGalleryProps {
  beforeAfterGallery?: BeforeAfterComparison[];
}

export function BeforeAfterGallery({ beforeAfterGallery }: BeforeAfterGalleryProps) {
  if (!beforeAfterGallery || beforeAfterGallery.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Resultados - Antes e Depois
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {beforeAfterGallery.map((comparison, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-brand-dark-nude/20">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">ANTES</h4>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {comparison.before?.asset ? (
                    <Image
                      src={urlFor(comparison.before).width(200).height(200).url()}
                      alt="Antes do tratamento"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-xs">Sem imagem</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">DEPOIS</h4>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {comparison.after?.asset ? (
                    <Image
                      src={urlFor(comparison.after).width(200).height(200).url()}
                      alt="Depois do tratamento"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-xs">Sem imagem</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {comparison.description && (
              <p className="text-sm text-gray-600 text-center">{comparison.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}