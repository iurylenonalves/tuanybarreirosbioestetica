import { formatPrice, calculateDiscount } from '@/lib/formatters/price';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscount?: boolean;
}

export function PriceDisplay({ 
  price, 
  originalPrice, 
  size = 'md',
  showDiscount = true 
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount ? calculateDiscount(originalPrice, price) : null;

  return (
    <div className="flex items-center gap-3">
      <span className={`${sizeClasses[size]} font-bold text-brand-text-button`}>
        {formatPrice(price)}
      </span>
      
      {hasDiscount && (
        <div className="flex flex-col">
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(originalPrice)}
          </span>
          {showDiscount && discount && (
            <span className="text-sm text-green-600 font-semibold">
              Economize {discount.formatted}
            </span>
          )}
        </div>
      )}
    </div>
  );
}