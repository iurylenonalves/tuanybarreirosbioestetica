'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreedToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Lida com a checkbox de forma especial
    const isCheckbox = type === 'checkbox';
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert('Você precisa aceitar os termos de serviço.');
      return;
    }
    // Lógica de envio do formulário (ex: para uma API)
    alert(`Formulário enviado!\nNome: ${formData.name}\nEmail: ${formData.email}`);
    // Resetar o formulário
    setFormData({ name: '', email: '', message: '', agreedToTerms: false });
  };

  return (
    // Esta é a última seção, vamos usar a cor 'bg-brand-off-white'
    <section className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-center">

          {/* Coluna do Formulário */}
          <div className="text-left">
            <span className="text-sm font-semibold uppercase text-brand-dark-nude">
              Contato
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mt-2 leading-tight">
              Fale comigo
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tire suas dúvidas ou agende uma consulta personalizada.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-dark-nude"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-dark-nude"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-dark-nude"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-brand-brown focus:ring-brand-dark-nude"
                />
                <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-800">
                  Aceito os termos de serviço
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-white text-brand-text-button px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>

          {/* Coluna do Logo */}
          <div className="hidden md:flex justify-center items-center">
            <Image
              src="/logo.png" // Garanta que o logo está em /public
              alt="Logo Tuany Barreiros Bioestética"
              width={750}
              height={750}
              className="opacity-70"
            />
          </div>

        </div>
      </div>
    </section>
  );
}