'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';

interface AddToCartButtonProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    type: 'product' | 'service';
    slug: string;
    stock?: number;
    bundleWith?: string[];
    bundleDiscount?: number;
  };
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({ 
  item, 
  disabled = false, 
  className = '',
  children = 'Adicionar ao Carrinho'
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem(item);
    openCart();
  };

  return (
    <Button
      variant="primary"
      onClick={handleAddToCart}
      disabled={disabled}
      className={className}
    >
      {children}
    </Button>
  );
}