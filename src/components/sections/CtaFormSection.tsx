'use client';

import { useState } from 'react';

export function CtaFormSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui viria a lógica para enviar o email para uma newsletter ou API
    alert(`Obrigado por se inscrever com o email: ${email}`);
    setEmail(''); // Limpa o campo após o envio
  };

  return (
    // Esta é a 5ª seção, o ciclo de cores recomeça com a segunda cor (#FEFAFA)
    // No seu design a cor é rosa, então usaremos a primeira cor: 'bg-brand-pink-light'
    <section className="bg-brand-pink-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-center">

          {/* Coluna de Texto */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              A jornada da sua pele começa aqui.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Transforme sua confiança com cuidados estéticos personalizados.
            </p>
          </div>

          {/* Coluna do Formulário */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="grow w-full px-5 py-3 rounded-lg bg-brand-light-nude border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-dark-nude transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-white text-brand-text-button px-6 py-3 rounded-lg font-semibold shadow-md cursor-pointer hover:shadow-lg transition-shadow whitespace-nowrap"
                >
                  Reserve agora
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
              Ao agendar, você se compromete com um caminho de bem-estar pessoal e cuidado profissional.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}