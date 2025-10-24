import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export function ServiceListSection() {
  return (    
    <section id="detalhes-servicos" className="bg-brand-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Bloco de Título */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Tratamentos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Serviços personalizados para você
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Cuidados especializados que revelam sua beleza natural.
          </p>
        </div>

        {/* Grid Principal Assimétrico */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Coluna Esquerda: Card Grande */}
          <div className="bg-white p-8 rounded-lg shadow-sm h-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-left">
              <span className="text-sm font-semibold uppercase text-brand-dark-nude">Facial</span>
              <h3 className="font-serif text-3xl font-bold mt-2 text-gray-800">Limpeza profunda e revitalização</h3>
              <p className="mt-2 text-gray-600 text-sm">Tratamento que limpa, renova e restaura a saúde da pele.</p>
              <Link href="/agendar" className="flex items-center gap-1 font-semibold text-gray-800 hover:text-brand-brown transition-colors mt-4 text-sm">
                Agendar <ChevronRight size={16} />
              </Link>
            </div>
            <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden">
              <Image
                src="/service-limpeza.jpg" // << Coloque esta imagem na pasta /public
                alt="Tratamento facial de limpeza profunda"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Coluna Direita: Dois Cards Menores */}
          <div className="flex flex-col gap-8">
            {/* Card Corporal */}
            <div className="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="text-left">
                <span className="text-sm font-semibold uppercase text-brand-dark-nude">Corporal</span>
                <h3 className="font-serif text-2xl font-bold mt-2 text-gray-800">Modelagem e bem-estar</h3>
                <p className="mt-2 text-gray-600 text-sm">Técnicas avançadas para esculpir e tonificar seu corpo.</p>
                <Link href="/agendar" className="flex items-center gap-1 font-semibold text-gray-800 hover:text-brand-brown transition-colors mt-4 text-sm">
                  Agendar <ChevronRight size={16} />
                </Link>
              </div>
              <div className="relative h-40 w-full rounded-lg overflow-hidden">
                <Image
                  src="/service-peeling.jpg" // << Coloque esta imagem na pasta /public
                  alt="Tratamento corporal de modelagem"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card Estética */}
            <div className="bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="text-left">
                <span className="text-sm font-semibold uppercase text-brand-dark-nude">Estética</span>
                <h3 className="font-serif text-2xl font-bold mt-2 text-gray-800">Tratamentos especializados</h3>
                <p className="mt-2 text-gray-600 text-sm">Procedimentos precisos para realçar sua beleza natural.</p>
                <Link href="/agendar" className="flex items-center gap-1 font-semibold text-gray-800 hover:text-brand-brown transition-colors mt-4 text-sm">
                  Agendar <ChevronRight size={16} />
                </Link>
              </div>
              <div className="relative h-40 w-full rounded-lg overflow-hidden">
                <Image
                  src="/service-nutricao.jpg" // << Coloque esta imagem na pasta /public
                  alt="Tratamentos estéticos especializados"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}