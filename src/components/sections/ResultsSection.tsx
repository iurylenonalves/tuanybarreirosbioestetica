import { ResultsCarousel, ResultSlide } from '@/components/ui/ResultsCarousel';

// Dados para a galeria de resultados
const resultsData: ResultSlide[] = [
  { src: '/result-1.jpg', alt: 'Resultado de tratamento facial 1' },
  { src: '/result-1.jpg', alt: 'Resultado de tratamento corporal 2' },
  { src: '/result-3.jpg', alt: 'Resultado de tratamento de pele 3' },
  { src: '/result-4.jpg', alt: 'Resultado de tratamento facial 4' },
  { src: '/result-5.jpg', alt: 'Resultado de tratamento corporal 5' },
];

export function ResultsSection() {
  return (
    // Esta é a 4ª seção, então a cor de fundo volta a ser a primeira do ciclo
    <section className="bg-brand-background py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Coluna de Texto */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
              Resultados
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Transformações que inspiram confiança.
            </p>
          </div>

          {/* Coluna do Carrossel */}
          <div>
            <ResultsCarousel slides={resultsData} />
          </div>

        </div>
      </div>
    </section>
  );
}