'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar mensagem para WhatsApp
    const itemsList = state.items.map(item => 
      `• ${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');
    
    const message = `*Pedido de Compra*\n\n*Itens:*\n${itemsList}\n\n*Total: ${formatPrice(state.total)}*\n\n*Dados do Cliente:*\nNome: ${customerInfo.name}\nEmail: ${customerInfo.email}\nTelefone: ${customerInfo.phone}\nEndereço: ${customerInfo.address}\nCidade: ${customerInfo.city}\nCEP: ${customerInfo.zipCode}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511954474237&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
          {/* Resumo do Pedido */}
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
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-brand-text-button">
                    {formatPrice(state.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Dados */}
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
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                      className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={customerInfo.zipCode}
                      onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                      className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button variant="primary" type="submit" className="w-full py-4 text-lg">
                  Enviar Pedido via WhatsApp
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