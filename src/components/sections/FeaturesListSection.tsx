import { FeatureRow } from '@/components/ui/FeatureRow';

const featuresData = [
  {
    eyebrow: 'DE DENTRO PARA FORA',
    title: 'Beleza é reflexo de saúde',
    description: 'Acreditamos que uma pele bonita é consequência de um corpo equilibrado. Unimos ciência e estética integrativa para tratar a causa, não apenas o sintoma.',
    imageSrc: '/service-limpeza.jpg',
    tags: [],
  },
  {
    eyebrow: 'DIAGNÓSTICO ÚNICO',
    title: 'Avaliação detalhada e escuta ativa',
    description: 'Analisamos seus exames, hábitos e queixas em profundidade. Seu plano de tratamento é desenhado exclusivamente para o seu momento e sua individualidade.',
    imageSrc: '/service-peeling.jpg',
    tags: [],
  },
  {
    eyebrow: 'RESULTADOS REAIS',
    title: 'Realce sua melhor versão',
    description: 'Nossos protocolos fogem dos exageros. Buscamos a harmonia e a naturalidade, devolvendo sua autoconfiança e preservando a essência de quem você é.',
    imageSrc: '/result-1.jpg',
    tags: [],
  },
  {
    eyebrow: 'EXPERIÊNCIA',
    title: 'Mais do que estética, acolhimento',
    description: 'Um ambiente seguro e acolhedor, onde você encontra suporte contínuo. Cuidar de si mesma deve ser uma jornada leve e prazerosa.',
    imageSrc: '/service-nutricao.jpg',
    tags: [],
  },
];

export function FeaturesListSection() {
  return (
    <section className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Title Block */}
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

        {/* Features List */}
        <div className="mt-16 space-y-16">
          {featuresData.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              eyebrow={feature.eyebrow}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              tags={feature.tags}
              imagePosition={index % 2 === 0 ? 'right' : 'left'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}