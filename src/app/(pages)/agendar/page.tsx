'use client'; 

import { Button } from "@/components/ui/Button";
import { getWhatsAppLink, MESSAGES } from "@/lib/whatsapp";
import Link from "next/link";

export default function SchedulePage() {
  
  return (
    <div className="bg-brand-background py-16 md:py-20 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
            Agende sua consulta
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Para oferecer um atendimento mais personalizado, agora realizamos nossos agendamentos diretamente pelo WhatsApp.
          </p>
          
          <div className="mt-8">
            <Link href={getWhatsAppLink(MESSAGES.agendar)} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-lg px-8 py-4">
                Agendar pelo WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
