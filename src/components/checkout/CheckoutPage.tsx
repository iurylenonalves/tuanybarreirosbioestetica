'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { checkoutSchema, formatZodError, sanitizeString } from '@/lib/validations/schemas';
import { z } from 'zod';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export function CheckoutPage() {
  const { state, removeItem, updateQuantity } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if cart has any services
  const hasServices = state.items.some(item => item.type === 'service');
  // If cart has services, we must use WhatsApp for scheduling. 
  // If it has ONLY products, we can use Mercado Pago.
  const isWhatsAppCheckout = hasServices;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Carrinho Vazio
          </h1>
          <p className="text-gray-600 mb-6">
            Adicione produtos ou serviços ao seu carrinho para continuar.
          </p>
          <Link href="/produtos">
            <Button variant="primary">Ver Produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    
    try {      
      const validatedData = checkoutSchema.parse(customerInfo);      
      
      const sanitizedData = {
        name: sanitizeString(validatedData.name),
        email: sanitizeString(validatedData.email),
        phone: validatedData.phone,
        address: sanitizeString(validatedData.address),
        city: sanitizeString(validatedData.city),
        zipCode: validatedData.zipCode
      };

      if (isWhatsAppCheckout) {
        // Create WhatsApp message
        const itemsList = state.items.map(item => 
          `• ${sanitizeString(item.name)} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`
        ).join('\n');
        
        let totalMessage = `*Total: ${formatPrice(state.total)}*`;
        if (state.discount > 0) {
          totalMessage = `*Subtotal: ${formatPrice(state.subtotal)}*\n*Desconto: -${formatPrice(state.discount)}*\n*Total: ${formatPrice(state.total)}*`;
        }
        
        const message = `*Pedido de Compra*\n\n*Itens:*\n${itemsList}\n\n${totalMessage}\n\n*Dados do Cliente:*\nNome: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nTelefone: ${sanitizedData.phone}\nEndereço: ${sanitizedData.address}\nCidade: ${sanitizedData.city}\nCEP: ${sanitizedData.zipCode}`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=5511954474237&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        // Mercado Pago Checkout
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: state.items,
            payer: sanitizedData,
          }),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('Erro ao criar pagamento:', data);
          alert('Ocorreu um erro ao iniciar o pagamento. Tente novamente.');
        }
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(formatZodError(error));
      } else {
        console.error('Erro no checkout:', error);
        alert('Ocorreu um erro inesperado. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">
            Revise seu pedido e preencha seus dados
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-brand-dark-nude/20">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-brand-off-white rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-brand-text-button font-bold">
                        {formatPrice(item.price)}
                      </p>
                      <span className="text-xs text-gray-500 bg-brand-pink-light px-2 py-1 rounded">
                        {item.type === 'product' ? 'Produto' : 'Serviço'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-brand-text-button text-white rounded-full flex items-center justify-center text-xs hover:bg-brand-brown transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-brand-text-button text-white rounded-full flex items-center justify-center text-xs hover:bg-brand-brown transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-dark-nude/20 mt-6 pt-6">
                {state.discount > 0 && (
                  <>
                    <div className="flex items-center justify-between text-gray-600 mb-2">
                      <span>Subtotal:</span>
                      <span>{formatPrice(state.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-green-600 mb-4">
                      <span>Desconto:</span>
                      <span>-{formatPrice(state.discount)}</span>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-brand-text-button">
                    {formatPrice(state.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Seus Dados
            </h2>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-brand-dark-nude/20">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => {
                      setCustomerInfo({...customerInfo, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.name ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                    placeholder="João da Silva"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => {
                      setCustomerInfo({...customerInfo, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.email ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                    placeholder="seuemail@exemplo.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => {
                      setCustomerInfo({...customerInfo, phone: e.target.value});
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => {
                      setCustomerInfo({...customerInfo, address: e.target.value});
                      if (errors.address) setErrors({...errors, address: ''});
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.address ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                    placeholder="Rua Exemplo, 123"
                  />
                  {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => {
                        setCustomerInfo({...customerInfo, city: e.target.value});
                        if (errors.city) setErrors({...errors, city: ''});
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.city ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                      placeholder="São Paulo"
                    />
                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={customerInfo.zipCode}
                      onChange={(e) => {
                        setCustomerInfo({...customerInfo, zipCode: e.target.value});
                        if (errors.zipCode) setErrors({...errors, zipCode: ''});
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                      placeholder="00000-000"
                    />
                    {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {isWhatsAppCheckout && (
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-4">
                    Seu carrinho contém serviços ou pacotes que requerem agendamento. 
                    O pedido será finalizado via WhatsApp para combinarmos os detalhes.
                  </div>
                )}
                
                <Button variant="primary" type="submit" className="w-full py-4 text-lg" disabled={isSubmitting}>
                  {isSubmitting 
                    ? 'Processando...' 
                    : isWhatsAppCheckout 
                      ? 'Finalizar via WhatsApp' 
                      : 'Ir para Pagamento (Mercado Pago)'
                  }
                </Button>
                
                <Link href="/produtos" className="block">
                  <Button variant="secondary" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                * Campos obrigatórios. Seu pedido será enviado via WhatsApp para confirmação.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}