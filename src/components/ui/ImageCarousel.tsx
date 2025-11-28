'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type Slide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

interface ImageCarouselProps {
  slides: Slide[];
}

export function ImageCarousel({ slides }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // previous and next navigation
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Function to navigate when clicking on the dots
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Updates the active dot when the slide changes
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const currentSlide = slides[selectedIndex];

  return (
    <div className="bg-brand-off-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto">
      {/* Carousel */}
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="relative shrink-0 grow-0 basis-full min-w-0 h-100" key={index}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Below the Carousel */}
      <div className="mt-4">
        <h3 className="font-serif text-xl font-semibold text-gray-800">{currentSlide.title}</h3>
        <p className="text-gray-500 mt-1 text-sm">{currentSlide.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-brand-brown w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <button onClick={scrollNext} className="p-2 rounded-full hover:bg-gray-100">
              <ArrowRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}