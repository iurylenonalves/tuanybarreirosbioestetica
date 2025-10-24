import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function AboutBioSection() {
  return (
    <section id="minha-jornada" className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Coluna de Texto */}
          <div className="text-center md:text-left">
            <span className="text-sm font-semibold uppercase text-brand-dark-nude">
              Quem sou
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800 leading-tight">
              Minha jornada na bioestética
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Eu crio beleza com precisão e compaixão. Cada tratamento conta uma história de transformação e autodescoberta.
            </p>

            {/* Sub-seção de Destaques */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-4xl font-bold text-gray-800">Experiência</h3>
                <p className="mt-2 text-gray-600">Anos de prática profissional dedicada.</p>
              </div>
              <div>
                <h3 className="font-serif text-4xl font-bold text-gray-800">Abordagem</h3>
                <p className="mt-2 text-gray-600">Cuidado personalizado que respeita a beleza individual.</p>
              </div>
            </div>

            {/* Botões */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <Link 
                href="/servicos"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Saiba mais
              </Link>
              <Link 
                href="/contato" 
                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-brand-brown transition-colors"
              >
                Contato
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Coluna da Imagem */}
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/tuany-retrato.jpg"
              alt="Tuany Barreiros em seu consultório"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}