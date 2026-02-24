import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FeatureRowProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imagePosition: 'left' | 'right';
  tags?: { text: string; href: string }[];
}

export function FeatureRow({ eyebrow, title, description, imageSrc, imagePosition, tags }: FeatureRowProps) {
  const imageOrderClass = imagePosition === 'left' ? 'md:order-1' : 'md:order-2';
  const textOrderClass = imagePosition === 'left' ? 'md:order-2' : 'md:order-1';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-center">
      {/* Image Column */}
      <div className={`relative w-full h-80 rounded-lg overflow-hidden ${imageOrderClass}`}>
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>

      {/* Text Column */}
      <div className={`text-center md:text-left ${textOrderClass}`}>
        <span className="text-sm font-semibold uppercase text-brand-brown">{eyebrow}</span>
        <h3 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-gray-800">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
        
        {tags && (
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
            {tags.map((tag) => (
              <Link 
                key={tag.text}
                href={tag.href}
                className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {tag.text}
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}