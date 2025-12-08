import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getWhatsAppLink, MESSAGES } from '@/lib/whatsapp';

export function ServiceCtaSection() {
  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
            Agende sua transformação
          </h2>
          
          <p className="mt-4 text-lg text-gray-600">
            Escolha o horário que melhor se adapta à sua rotina e comece sua jornada de bem-estar.
          </p>

          <div className="mt-8">
            <Link href={getWhatsAppLink(MESSAGES.avaliacao)} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">Agendar Avaliação</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}