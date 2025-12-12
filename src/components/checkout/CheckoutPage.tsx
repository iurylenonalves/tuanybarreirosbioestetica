'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { checkoutSchema, formatZodError, sanitizeString } from '@/lib/validations/schemas';
import { z } from 'zod';
import { toast } from 'sonner';

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
    zipCode: '',
    address: '',      // Logradouro
    number: '',       // Novo
    neighborhood: '', // Novo
    city: '',         // Cidade
    state: ''         // Novo (UF)
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Check if cart has any services
  const hasServices = state.items.some(item => item.type === 'service');
  // If cart has services, we must use WhatsApp for scheduling. 
  // If it has ONLY products, we can use Mercado Pago.
  const isWhatsAppCheckout = hasServices;

  const searchCep = async (cepValue: string) => {
    const cep = cepValue.replace(/\D/g, '');
    
    if (cep.length === 8) {
      setIsLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setCustomerInfo(prev => ({
            ...prev,
            address: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
          // Limpa erros de endereço se houver
          setErrors(prev => ({...prev, address: '', city: '', neighborhood: '', state: ''}));
          
          // Focus on number field
          document.getElementById('address-number')?.focus();
        } else {
           setErrors(prev => ({...prev, zipCode: 'CEP não encontrado'}));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        setErrors(prev => ({...prev, zipCode: 'Erro ao buscar CEP'}));
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleCepBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    searchCep(e.target.value);
  };

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
        number: sanitizeString(validatedData.number),
        neighborhood: sanitizeString(validatedData.neighborhood),
        city: sanitizeString(validatedData.city),
        state: sanitizeString(validatedData.state),
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
        
        const message = `*Pedido de Compra*\n\n*Itens:*\n${itemsList}\n\n${totalMessage}\n\n*Dados do Cliente:*\nNome: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nTelefone: ${sanitizedData.phone}\nEndereço: ${sanitizedData.address}, ${sanitizedData.number} - ${sanitizedData.neighborhood}\nCidade: ${sanitizedData.city} - ${sanitizedData.state}\nCEP: ${sanitizedData.zipCode}`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=5511954474237&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        // Mercado Pago Checkout
        
        // Apply discounts before sending to API
        const itemQuantities = new Map<string, number>();
        state.items.forEach(item => {
          itemQuantities.set(item.id, item.quantity);
        });

        const itemsWithDiscounts = state.items.map(item => {
          let finalPrice = item.price;
          
          // Check for bundle discount logic
          if (item.bundleWith && item.bundleDiscount && item.bundleWith.length > 0) {
            const hasBundlePartner = item.bundleWith.some(partnerId => {
              const partnerQty = itemQuantities.get(partnerId);
              return partnerQty && partnerQty > 0;
            });

            if (hasBundlePartner) {
              finalPrice = item.price * (1 - item.bundleDiscount / 100);
            }
          }

          return {
            ...item,
            price: Number(finalPrice.toFixed(2)) // Send the discounted price
          };
        });

        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: itemsWithDiscounts,
            payer: sanitizedData,
          }),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('Erro ao criar pagamento:', data);
          toast.error(data.error || 'Ocorreu um erro ao iniciar o pagamento. Tente novamente.');
        }
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(formatZodError(error));
        toast.error('Por favor, verifique os campos destacados.');
      } else {
        console.error('Erro no checkout:', error);
        toast.error('Ocorreu um erro inesperado. Tente novamente.');
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
                      CEP
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customerInfo.zipCode}
                        onChange={(e) => {
                          // Máscara simples de CEP
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, '$1-$2');
                          
                          setCustomerInfo({...customerInfo, zipCode: val});
                          if (errors.zipCode) setErrors({...errors, zipCode: ''});
                          
                          // Auto-search if 8 digits
                          if (val.replace(/\D/g, '').length === 8) {
                            searchCep(val);
                          }
                        }}
                        onBlur={handleCepBlur}
                        maxLength={9}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                        placeholder="00000-000"
                      />
                      {isLoadingCep && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-text-button"></div>
                        </div>
                      )}
                    </div>
                    {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                  </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Endereço (Rua)
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address}
                      onChange={(e) => {
                        setCustomerInfo({...customerInfo, address: e.target.value});
                        if (errors.address) setErrors({...errors, address: ''});
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent ${errors.address ? 'border-red-500' : 'border-brand-dark-nude/20'}`}
                      placeholder="Rua Exemplo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número
                    </label>
                    <input
                      id="address-number"
                      type="text"
                      value={customerInfo.number}
                      onChange={(e) => {
                        setCustomerInfo({...customerInfo, number: e.target.value});
                      }}
                      className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={customerInfo.neighborhood}
                    onChange={(e) => {
                      setCustomerInfo({...customerInfo, neighborhood: e.target.value});
                    }}
                    className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                    placeholder="Bairro"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
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
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estado
                    </label>
                    <input
                      type="text"
                      value={customerInfo.state}
                      onChange={(e) => {
                        setCustomerInfo({...customerInfo, state: e.target.value});
                      }}
                      className="w-full px-4 py-3 border border-brand-dark-nude/20 rounded-lg focus:ring-2 focus:ring-brand-text-button focus:border-transparent"
                      placeholder="SP"
                    />
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