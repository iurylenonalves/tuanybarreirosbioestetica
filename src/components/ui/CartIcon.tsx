'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

export function CartIcon() {
  const { state, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-brand-pink-light rounded-full transition-colors group"
      aria-label="Abrir carrinho"
    >
      {/* Ícone de sacola de compras mais elegante */}
      <svg 
        className="w-6 h-6 text-brand-text-button group-hover:text-brand-brown transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" 
        />
      </svg>
      
      {/* Badge de quantidade */}
      {state.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-notification text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {state.itemCount > 99 ? '99+' : state.itemCount}
        </span>
      )}
    </button>
  );
}