import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface ServiceImage {
  asset?: { _ref: string; url?: string };
  alt?: string;
}

interface ServiceGalleryProps {
  image: ServiceImage;
  gallery?: ServiceImage[];
  name: string;
}

export function ServiceGallery({ image, gallery, name }: ServiceGalleryProps) {
  return (
    <div>
      {/* Main image */}
      <div className="aspect-4/3 bg-gray-100 rounded-2xl overflow-hidden mb-4">
        {image?.asset ? (
          <Image
            src={urlFor(image).width(600).height(450).url()}
            alt={image.alt || name}
            width={600}
            height={450}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">✨</span>
          </div>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {gallery && gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.slice(0, 3).map((galleryImage, index) => {
            if (!galleryImage?.asset) return null;
            return (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(galleryImage).width(150).height(150).url()}
                  alt={galleryImage.alt || `${name} - imagem ${index + 2}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}