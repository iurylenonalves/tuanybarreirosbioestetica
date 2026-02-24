import { TimelineCarousel, TimelineSlide } from '@/components/ui/TimelineCarousel';

const timelineData: TimelineSlide[] = [
  {
    year: '2015',
    description: 'Primeira certificação profissional em técnicas avançadas de bioestética.',
    imageSrc: '/timeline-1.jpg',
  },
  {
    year: '2017',
    description: 'Treinamento especializado em bem-estar holístico e tratamentos de beleza personalizados.',
    imageSrc: '/timeline-2.jpg',
  },
  {
    year: '2019',
    description: 'Estabelecimento da prática privada com foco em experiências individualizadas para clientes.',
    imageSrc: '/timeline-3.jpg',
  },
  {
    year: '2022',
    description: 'Introdução de novas tecnologias e métodos não invasivos para resultados superiores.',
    imageSrc: '/timeline-4.jpg',
  },
];

export function TimelineSection() {
  return (
    <section className="bg-brand-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase text-brand-brown">
            Trajetória
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Momentos que definiram minha carreira
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Uma jornada de aprendizado contínuo e crescimento profissional em bioestética.
          </p>
          {/* <div className="mt-8 flex items-center justify-center gap-6">
            <Link 
              href="/procedimentos"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Explorar
            </Link>
            <Link 
              href="/contato" 
              className="flex items-center gap-2 font-semibold text-gray-800 hover:text-brand-brown transition-colors"
            >
              Detalhes
            </Link>
          </div> */}
        </div>

        {/* Timeline Carousel */}
        <div className="mt-20">
          <TimelineCarousel slides={timelineData} />
        </div>
      </div>
    </section>
  );
}