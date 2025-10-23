import { ServiceCard, ServiceCardProps } from '@/components/cards/ServiceCard';

// Guardamos os dados dos serviços aqui para manter o código limpo
const servicesData: ServiceCardProps[] = [
  {
    category: 'Limpeza',
    title: 'Limpeza profunda de pele',
    description: 'Removemos impurezas e revitalizamos sua pele.',
    imageSrc: '/service-limpeza.jpg', // Adicione esta imagem em /public
    linkHref: '/servicos/limpeza-de-pele',
  },
  {
    category: 'Peeling',
    title: 'Renovação celular',
    description: 'Tratamento intensivo para uniformizar o tom.',
    imageSrc: '/service-peeling.jpg', // Adicione esta imagem em /public
    linkHref: '/servicos/renovacao-celular',
  },
  {
    category: 'Hidratação',
    title: 'Nutrição profunda',
    description: 'Recupere a luminosidade e maciez da pele.',
    imageSrc: '/service-nutricao.jpg', // Adicione esta imagem em /public
    linkHref: '/servicos/nutricao-profunda',
  },
];

export function ServicesSection() {
  return (
    // Esta é a 3ª seção, então a cor de fundo será a 'brand-background' (#FFFCFA)
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        
        {/* Bloco de Título */}
        <span className="text-sm font-semibold uppercase text-brand-dark-nude">
          Tratamentos
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-gray-800">
          Meus serviços
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Cada tratamento é pensado para atender suas necessidades únicas.
        </p>

        {/* Grid de Serviços */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.title}
              category={service.category}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              linkHref={service.linkHref}
            />
          ))}
        </div>

      </div>
    </section>
  );
}