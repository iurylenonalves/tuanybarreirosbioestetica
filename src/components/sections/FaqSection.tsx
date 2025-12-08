'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { Button } from '../ui/Button';

const faqData = [
  {
    question: 'Quais tratamentos você oferece?',
    answer: 'Ofereço uma variedade de tratamentos personalizados de bioestética, incluindo limpeza de pele, microagulhamento, peeling e tratamentos corporais.',
  },
  {
    question: 'Como funciona o agendamento?',
    answer: 'Você pode agendar diretamente pelo nosso WhatsApp. Farei uma breve consulta para entender suas necessidades.',
  },
  {
    question: 'Quais são os preços?',
    answer: 'Os preços variam de acordo com o tratamento. Após a consulta inicial, posso oferecer um orçamento personalizado.',
  },
  {
    question: 'Quanto tempo dura cada sessão?',
    answer: 'A duração depende do tratamento, mas geralmente varia entre 45 e 90 minutos.',
  },
  {
    question: 'Posso parcelar o tratamento?',
    answer: 'Sim, oferecemos parcelamento em até 3 vezes sem juros no cartão de crédito.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-brand-light-nude py-16 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Tittle Block */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
            Perguntas
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Dúvidas frequentes ajudam a esclarecer nosso trabalho.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* CTA Block */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-800">Ainda tem dúvidas?</h3>
          <p className="mt-2 text-gray-600">Entre em contato para um atendimento personalizado.</p>
          <div className="mt-6">
            <Link href="/contato">
              <Button variant="primary">Contato</Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}