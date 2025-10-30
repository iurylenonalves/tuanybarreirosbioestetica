import { Metadata } from 'next';
import { CheckoutPage } from '@/components/checkout/CheckoutPage';

export const metadata: Metadata = {
  title: 'Finalizar Compra',
  description: 'Finalize sua compra de produtos e serviços de bioestética.',
};

export default function Checkout() {
  return <CheckoutPage />;
}