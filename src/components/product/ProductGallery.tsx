import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface ProductImage {
  alt?: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-4xl">🧴</span>
      </div>
    );
  }

  return (
    <div>
      {/* Imagem principal */}
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
        <Image
          src={urlFor(images[0]).width(600).height(600).url()}
          alt={images[0].alt || name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      
      {/* Galeria de thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={urlFor(image).width(150).height(150).url()}
                alt={image.alt || `${name} - imagem ${index + 2}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}