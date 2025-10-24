import { FeatureRow } from '@/components/ui/FeatureRow';

const featuresData = [
  {
    eyebrow: 'Cuidado',
    title: 'Abordagem personalizada',
    description: 'Cada tratamento é único. Desenvolvemos estratégias individuais para suas necessidades específicas.',
    imageSrc: '/service-limpeza.jpg',
    tags: [{ text: 'Saiba mais', href: '#' }, { text: 'Detalhes', href: '#' }],
  },
  {
    eyebrow: 'Técnicas profissionais',
    title: 'Utilizamos métodos avançados e equipamentos de última geração para resultados excepcionais.',
    description: '',
    imageSrc: '/service-peeling.jpg',
    tags: [{ text: 'Conforto', href: '#' }, { text: 'Ambiente acolhedor', href: '#' }],
  },
  {
    eyebrow: 'Resultado',
    title: 'Saiba mais',
    description: 'Criamos um espaço de bem-estar onde você se sente segura e relaxada. Nosso objetivo é realçar sua beleza única, não modificá-la.',
    imageSrc: '/result-1.jpg',
    tags: [{ text: 'Transformação natural', href: '#' }],
  },
  {
    eyebrow: 'Acompanhamento contínuo',
    title: 'Compromisso',
    description: 'Oferecemos suporte e orientação mesmo após o tratamento.',
    imageSrc: '/service-nutricao.jpg',
    tags: [{ text: 'Saiba mais', href: '#' }],
  },
];

export function FeaturesListSection() {
  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Bloco de Título */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Benefícios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Por que escolher nossos serviços
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Transformação que vai além da aparência.
          </p>
        </div>

        {/* Lista de Features */}
        <div className="mt-16 space-y-16">
          {featuresData.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              eyebrow={feature.eyebrow}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              tags={feature.tags}
              // Lógica para alternar a posição da imagem
              imagePosition={index % 2 === 0 ? 'right' : 'left'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}