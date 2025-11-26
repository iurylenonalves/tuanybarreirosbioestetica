import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CtaFormSection() {
  return (
    <section className="bg-brand-pink-light py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Realce a sua beleza natural
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Agende sua avaliação e descubra o tratamento ideal para você.
        </p>
        
        <div className="mt-8">
          <Link href="/agendar">
            <Button variant="primary">Agendar Avaliação</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}