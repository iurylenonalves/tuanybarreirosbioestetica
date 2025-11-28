'use client'; 

import { InlineWidget } from "react-calendly";

export default function SchedulePage() {
  
  const calendlyUrl = "https://calendly.com/iuryalves-uk/avaliacao-online";

  return (
    <div className="bg-brand-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
            Agende sua consulta
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Escolha o melhor dia e horário para você. O agendamento é rápido, fácil e seguro.
          </p>
        </div>

        {/* Calendly Widget */}
        <div className="min-h-[700px]">
          <InlineWidget url={calendlyUrl} />
        </div>
      </div>
    </div>
  );
}