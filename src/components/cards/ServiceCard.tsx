import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface ServiceCardProps {
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  linkHref: string;
}

export function ServiceCard({ category, title, description, imageSrc, linkHref }: ServiceCardProps) {
  return (
    <div className="bg-brand-background rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl">
      {/* Imagem */}
      <div className="relative w-full h-72">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <span className="text-sm font-semibold uppercase text-brand-dark-nude">{category}</span>
        <h3 className="font-serif text-2xl font-bold mt-2 text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <Link 
          href={linkHref} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold text-gray-800 hover:text-brand-brown transition-colors mt-4"
        >
          Agendar
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}