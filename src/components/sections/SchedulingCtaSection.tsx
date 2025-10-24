'use client';

import { useState } from 'react';

export function SchedulingCtaSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Agendamento solicitado para o email: ${email}`);
    setEmail('');
  };

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

          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                required
                className="grow w-full px-5 py-3 rounded-lg bg-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-dark-nude transition-shadow"
              />
              <button
                type="submit"
                className="bg-white text-brand-text-button px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow whitespace-nowrap"
              >
                Agendar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Ao agendar, você concorda com nossos termos de serviço.
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}