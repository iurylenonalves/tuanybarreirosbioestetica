'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, User } from 'lucide-react';

export interface TestimonialSlide {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarSrc?: string;
}

interface TestimonialsCarouselProps {
  slides: TestimonialSlide[];
}

export function TestimonialsCarousel({ slides }: TestimonialsCarouselProps) {
  // 2. Adicione o plugin Autoplay ao hook do Embla
  // O segundo argumento do useEmblaCarousel é um array de plugins.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 4000, // Tempo em milissegundos (4 segundos)
      stopOnInteraction: false, // Continua o autoplay mesmo depois de uma interação manual
      stopOnMouseEnter: true, // Pausa o autoplay quando o mouse está sobre o carrossel
    }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="relative shrink-0 grow-0 basis-full min-w-0" key={index}>
              <div className="text-center max-w-3xl mx-auto">
                {/* Estrelas */}
                <div className="flex justify-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" className="text-gray-800" />
                  ))}
                </div>

                {/* Citação */}
                <blockquote className="mt-6">
                  <p className="font-serif text-2xl md:text-3xl font-medium text-gray-800">
                    &quot;{slide.quote}&quot;
                  </p>
                </blockquote>

                {/* Autor */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{slide.authorName}</p>
                    <p className="text-sm text-gray-500">{slide.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Pontos de Navegação */}
      <div className="flex justify-center gap-3 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-brand-brown' : 'bg-gray-300'
            }`}
            aria-label={`Ir para o depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}