import { ResultsCarousel, ResultSlide } from '@/components/ui/ResultsCarousel';

// Data for the results carousel
const resultsData: ResultSlide[] = [
  { src: '/result-1.jpg', alt: 'Resultado de tratamento facial 1' },
  { src: '/result-1.jpg', alt: 'Resultado de tratamento corporal 2' },
  { src: '/service-nutricao.jpg', alt: 'Resultado de tratamento de pele 3' },
  { src: '/service-limpeza.jpg', alt: 'Resultado de tratamento facial 4' },
  { src: '/service-peeling.jpg', alt: 'Resultado de tratamento corporal 5' },
];

export function ResultsSection() {
  return (
    <section className="bg-brand-background py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Column */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
              Resultados
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Transformações que inspiram confiança.
            </p>
          </div>

          {/* Carousel Column */}
          <div>
            <ResultsCarousel slides={resultsData} />
          </div>

        </div>
      </div>
    </section>
  );
}