'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export function Cart() {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();

  if (!state.isOpen) return null;

  return (
    <>      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl border-l border-brand-dark-nude/20 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-dark-nude/20">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Carrinho ({state.itemCount})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-brand-pink-light rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Carrinho vazio
                </h3>
                <p className="text-gray-600 mb-6">
                  Adicione produtos ou serviços para continuar
                </p>
                <Link href="/produtos">
                  <Button variant="primary" onClick={closeCart}>
                    Ver Produtos
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-brand-off-white rounded-lg border border-brand-dark-nude/20">
                    {/* Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-brand-text-button font-bold">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 bg-brand-pink-light px-2 py-1 rounded">
                          {item.type === 'product' ? 'Produto' : 'Serviço'}
                        </span>
                        {item.stock !== undefined && item.stock <= 5 && (
                          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                            {item.stock === 0 ? 'Esgotado' : `${item.stock} restantes`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-brand-text-button text-white rounded-full flex items-center justify-center text-xs hover:bg-brand-brown transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.type === 'product' && item.stock !== undefined && item.quantity >= item.stock}
                          className="w-6 h-6 bg-brand-text-button text-white rounded-full flex items-center justify-center text-xs hover:bg-brand-brown transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-600 hover:text-red-800 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {state.items.length > 0 && (
                  <button
                    onClick={() => {
                      clearCart();
                      toast.success('Carrinho limpo com sucesso!');
                    }}
                    className="w-full text-sm text-gray-600 hover:text-red-600 py-2 transition-colors"
                  >
                    Limpar carrinho
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-brand-dark-nude/20 p-6">
              {state.discount > 0 && (
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>{formatPrice(state.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600 font-medium">
                    <span>Desconto:</span>
                    <span>-{formatPrice(state.discount)}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-brand-text-button">
                  {formatPrice(state.total)}
                </span>
              </div>
              
              <div className="space-y-3">
                <Link href="/checkout" className="block" onClick={closeCart}>
                  <Button variant="primary" className="w-full">
                    Finalizar Compra
                  </Button>
                </Link>
                <Link href="/produtos" className="block" onClick={closeCart}>
                  <Button variant="secondary" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}