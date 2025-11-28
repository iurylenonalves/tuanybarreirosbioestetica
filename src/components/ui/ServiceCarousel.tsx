'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ServiceCard, ServiceCardProps } from '@/components/cards/ServiceCard';

interface ServiceCarouselProps {
  items: ServiceCardProps[];
}

export function ServiceCarousel({ items }: ServiceCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    loop: items.length > 3, // Only loop if we have enough items
    skipSnaps: false 
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group">
      <div className="overflow-hidden px-4 -mx-4" ref={emblaRef}>
        <div className="flex -ml-6 py-4">
          {items.map((item, index) => (
            <div key={index} className="pl-6 min-w-0 flex-none w-full md:w-1/2 lg:w-1/3">
              <ServiceCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Only show if scrollable */}
      {(canScrollPrev || canScrollNext) && (
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={scrollPrev} 
            disabled={!canScrollPrev} 
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-brand-brown"
            aria-label="Anterior"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={scrollNext} 
            disabled={!canScrollNext} 
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-brand-brown"
            aria-label="Próximo"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
