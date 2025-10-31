'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react';

export interface TimelineSlide {
  year: string;
  description: string;
  imageSrc: string;
}

interface TimelineCarouselProps {
  slides: TimelineSlide[];
}

const emblaOptions: EmblaOptionsType = {
  align: 'start',
  loop: false, // Loop desativado em timelines
  containScroll: 'trimSnaps',
};

export function TimelineCarousel({ slides }: TimelineCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* O Carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {slides.map((slide, index) => (
            <div className="relative shrink-0 grow-0 basis-11/12 sm:basis-1/2 md:basis-1/3 pl-4" key={index}>
              {/* Imagem Placeholder */}
              <div className="bg-gray-200 aspect-square w-full rounded-lg flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400" />
              </div>
              {/* Linha do Tempo e Conteúdo */}
              <div className="relative pt-8 mt-4 text-center">
                {/* Linha */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gray-300"></div>
                {/* Ponto na Linha */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full"></div>
                
                <h3 className="font-serif text-2xl font-bold text-gray-800">{slide.year}</h3>
                <p className="mt-2 text-sm text-gray-600">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      <button 
        onClick={scrollPrev} 
        className="absolute top-1/3 -translate-y-1/2 -left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Anterior"
      >
        <ArrowLeft size={20} />
      </button>
      <button 
        onClick={scrollNext} 
        className="absolute top-1/3 -translate-y-1/2 -right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Próximo"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}