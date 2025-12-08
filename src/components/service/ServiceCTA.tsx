import Link from 'next/link';
import { getWhatsAppLink, MESSAGES } from '@/lib/whatsapp';

export function ServiceCTA() {
  return (
    <div className="text-center mt-16">
      <div className="bg-brand-brown rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-serif font-bold mb-4">
          Pronta para transformar sua pele?
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Agende sua consulta e descubra como este tratamento pode realçar sua beleza natural
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={getWhatsAppLink(MESSAGES.agendar)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-text-button px-8 py-3 rounded-lg font-semibold hover:bg-brand-pink-light transition-colors"
          >
            Agendar Consulta
          </Link>
          <Link
            href={getWhatsAppLink(MESSAGES.duvida)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-text-button transition-colors"
          >
            Tirar Dúvidas
          </Link>
        </div>
      </div>
    </div>
  );
}