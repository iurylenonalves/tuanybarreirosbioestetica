import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function ProductsSection() {
  return (
    <section className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-center">

          {/* Image Column */}
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/products-image.jpg"
              alt="Produtos de cuidado para a pele da clínica Tuany Barreiros"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Column */}
          <div className="text-center md:text-left">
            <span className="text-sm font-semibold uppercase text-brand-brown">
              Produtos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mt-2 leading-tight">
              Cuidados para sua pele
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Selecionamos produtos premium para complementar seus tratamentos. Cuidado profissional em casa.
            </p>
            
            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <Link href="/produtos">
                <Button variant="secondary">Comprar</Button>
              </Link>
              <Link 
                href="/produtos" 
                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-brand-brown transition-colors"
              >
                Detalhes
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}