'use client';

import { useState } from 'react';
import Image from 'next/image';
import { contactSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error on field change
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {      
      const validatedData = contactSchema.parse(formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          agreedToTerms: validatedData.agreedToTerms,
        }),
      });

      const data = await response.json();

      // Check rate limiting
      if (response.status === 429) {
        setErrors({ 
          submit: 'Você está enviando mensagens muito rápido. Aguarde alguns minutos e tente novamente.' 
        });
        return;
      }

      // Backend validation error
      if (response.status === 400) {
        setErrors({ submit: data.error || 'Dados inválidos. Verifique os campos.' });
        return;
      }

      // Server error
      if (!response.ok) {
        setErrors({ submit: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
        return;
      }

      // Success!
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', agreedToTerms: false });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ submit: 'Erro ao enviar mensagem. Tente novamente.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-center">

          {/* Form Column */}
          <div className="text-left">
            <span className="text-sm font-semibold uppercase text-brand-brown">
              Contato
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mt-2 leading-tight">
              Fale comigo
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tire suas dúvidas ou agende uma consulta personalizada.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Success Message */}
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">✓ Mensagem enviada com sucesso!</p>
                  <p className="text-green-600 text-sm mt-1">Entraremos em contato em breve.</p>
                </div>
              )}

              {/* General submission error */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{errors.submit}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 ${
                    errors.name ? 'ring-2 ring-red-500' : 'focus:ring-brand-dark-nude'
                  }`}
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 ${
                    errors.email ? 'ring-2 ring-red-500' : 'focus:ring-brand-dark-nude'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 ${
                    errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-brand-dark-nude'
                  }`}
                  placeholder="(11) 98765-4321"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 ${
                    errors.message ? 'ring-2 ring-red-500' : 'focus:ring-brand-dark-nude'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 rounded border-gray-300 text-brand-brown focus:ring-brand-dark-nude"
                />
                <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-800">
                  Aceito os termos de serviço e autorizo o uso dos meus dados para contato *
                </label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-sm text-red-600 -mt-4">{errors.agreedToTerms}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-white text-brand-text-button px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </div>
            </form>
          </div>

          {/* Logo Column */}
          <div className="hidden md:flex justify-center items-center">
            <Image
              src="/logo.png"
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