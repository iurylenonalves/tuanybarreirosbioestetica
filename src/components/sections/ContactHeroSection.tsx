import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ContactHeroSection() {
  return (
    <section className="bg-brand-pink-light py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Conexão
          </span>

          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-2 text-gray-800">
            Entre em contato
          </h1>
          
          <p className="mt-4 text-lg text-gray-600">
            Estou aqui para ouvir suas dúvidas e ajudar você a alcançar seus objetivos de bem-estar.
          </p>
          
          {/* BOTÃO ÚNICO E CENTRALIZADO, CONFORME SUA SUGESTÃO */}
          <div className="mt-8">
            <Link 
              href="https://api.whatsapp.com/send?phone=5511954474237&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary">Saiba mais</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}