/**
 * Formats prices in Brazilian Real
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

/**
 * Calculates discount amount and percentage
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): {
  amount: number;
  percentage: number;
  formatted: string;
} {
  const amount = originalPrice - currentPrice;
  const percentage = Math.round((amount / originalPrice) * 100);
  
  return {
    amount,
    percentage,
    formatted: formatPrice(amount)
  };
}