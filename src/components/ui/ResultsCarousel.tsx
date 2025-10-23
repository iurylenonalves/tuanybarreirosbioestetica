'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Dados que cada slide da galeria vai precisar
export interface ResultSlide {
  src: string;
  alt: string;
}

interface ResultsCarouselProps {
  slides: ResultSlide[];
}

const emblaOptions: EmblaOptionsType = {
  align: 'start', // Alinha os slides a partir do início
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
      {/* O Carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4"> {/* Margem negativa para alinhar com o grid */}
          {slides.map((slide, index) => (
            // A largura de cada slide é controlada aqui para responsividade
            <div className="relative shrink-0 grow-0 basis-11/12 md:basis-4/5 pl-4" key={index}>
              <div className="relative h-96 w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <button onClick={scrollNext} className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <ArrowRight size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
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