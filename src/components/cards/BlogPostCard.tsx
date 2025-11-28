import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BlogPostCardProps {
  category: string;
  readingTime: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  linkHref: string;
}

export function BlogPostCard({ category, readingTime, title, excerpt, imageSrc, linkHref }: BlogPostCardProps) {
  return (
    <Link href={linkHref} className="block group">
      <div className="bg-brand-off-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        {/* Imagem */}
        <div className="relative w-full h-56">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="font-semibold">{category}</span>
            <span>&bull;</span>
            <span>{readingTime}</span>
          </div>
          <h3 className="font-serif text-2xl font-bold mt-3 text-gray-800">{title}</h3>
          <p className="mt-2 text-gray-600 text-sm grow">{excerpt}</p>
          <div className="flex items-center gap-1 font-semibold text-gray-800 group-hover:text-brand-brown transition-colors mt-4">
            Leia mais
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}