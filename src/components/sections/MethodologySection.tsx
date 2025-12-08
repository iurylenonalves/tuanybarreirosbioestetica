import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { getWhatsAppLink, MESSAGES } from '@/lib/whatsapp';

interface Step {
  title: string;
  description: string;
}

async function getMethodologyData() {
  const query = `*[_type == "methodology"][0] {
    title,
    description,
    steps[] {
      title,
      description
    },
    closingText,
    ctaText,
    ctaLink
  }`;
  return client.fetch(query);
}

export async function MethodologySection() {
  const data = await getMethodologyData();

  // Fallback data based on client's copy
  const title = data?.title || 'Como funcionam os meus atendimentos';
  const description = data?.description || 'Acredito que estética vai muito além do espelho, por isso, cada tratamento que realizo é pensado para revelar a sua melhor versão, respeitando a sua individualidade e o momento que você está vivendo.';
  
  const steps = data?.steps || [
    {
      title: 'Avaliação Completa',
      description: 'Antes de qualquer procedimento, realizo uma avaliação completa, que inclui análise de exames, hábitos de vida e principais queixas. Essa escuta ativa e olhar atento me permitem identificar a verdadeira causa do que está incomodando, e não apenas tratar o sintoma.'
    },
    {
      title: 'Diagnóstico Personalizado',
      description: 'Com base nesse diagnóstico personalizado, elaboro um plano de cuidados sob medida, que combina ciência, tecnologia e estética integrativa, cuidando de dentro para fora.'
    },
    {
      title: 'Resultado Real',
      description: 'Porque uma pele bonita é reflexo de um corpo equilibrado e de uma mente em harmonia.'
    }
  ];

  const closingText = data?.closingText || 'Na minha clínica, você encontra mais do que procedimentos: encontra acolhimento, escuta e resultados reais.';
  const ctaText = data?.ctaText || 'Agende sua avaliação';
  const ctaLink = data?.ctaLink || '/agendar';
  const finalCtaLink = ctaLink === '/agendar' ? getWhatsAppLink(MESSAGES.avaliacao) : ctaLink;

  return (
    <section className="bg-brand-pink-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Metodologia
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-gray-800 uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step: Step, index: number) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-brand-light-nude">
              <div className="w-12 h-12 bg-brand-dark-nude text-white rounded-full flex items-center justify-center text-xl font-serif font-bold mb-6">
                {index + 1}
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing and CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl font-serif text-gray-800 italic mb-8">
            &quot;{closingText}&quot;
          </p>
          <Link href={finalCtaLink} target={ctaLink === '/agendar' ? "_blank" : undefined} rel={ctaLink === '/agendar' ? "noopener noreferrer" : undefined}>
            <Button variant="primary" className="px-8 py-4 text-lg">
              {ctaText}
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
