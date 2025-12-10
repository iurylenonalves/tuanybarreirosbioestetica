'use client';

import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the user lands on the success page
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-brand-dark-nude/20">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Obrigado pela sua compra. Seu pedido foi processado com sucesso e você receberá os detalhes por email em breve.
        </p>

        <div className="space-y-4">
          <Link href="/produtos" className="block">
            <Button variant="primary" className="w-full">
              Continuar Comprando
            </Button>
          </Link>
          
          <Link href="/" className="block">
            <Button variant="secondary" className="w-full">
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
