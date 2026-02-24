'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface ResultSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface ResultsCarouselProps {
  slides: ResultSlide[];
}

const emblaOptions: EmblaOptionsType = {
  align: 'start', 
  loop: true,
  containScroll: 'trimSnaps',
};

export function ResultsCarousel({ slides }: ResultsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <div>
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4"> {/* Negative margin to align with the grid */}
          {slides.map((slide, index) => (
            
            <div className="relative shrink-0 grow-0 basis-11/12 md:basis-4/5 pl-4" key={index}>
              <div className="relative h-96 w-full overflow-hidden rounded-lg group">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
                {slide.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium text-center">
                      {slide.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors" aria-label="Resultado anterior">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <button onClick={scrollNext} className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors" aria-label="Próximo resultado">
            <ArrowRight size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Ir para o resultado ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-brand-brown' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}