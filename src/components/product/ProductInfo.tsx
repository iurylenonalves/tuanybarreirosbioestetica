import { RatingStars } from '@/components/shared/RatingStars';
import { PriceDisplay } from '@/components/shared/PriceDisplay';

interface Product {
  name: string;
  category: {
    name: string;
  };
  featured?: boolean;
  price: number;
  compareAtPrice?: number;
  brand?: string;
  sku?: string;
  stock?: number;
  tags?: string[];
}

interface Review {
  rating: number;
}

interface ProductInfoProps {
  product: Product;
  reviews: Review[];
}

export function ProductInfo({ product, reviews }: ProductInfoProps) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-brand-text-button bg-brand-pink-light px-2 py-1 rounded border border-brand-dark-nude/20">
          {product.category.name}
        </span>
        {product.featured && (
          <span className="text-sm text-yellow-600 px-2 py-1 rounded">
            ⭐ Destaque
          </span>
        )}
      </div>

      {/* Product name */}
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
        {product.name}
      </h1>

      {/* Reviews */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <RatingStars rating={averageRating} />
          <span className="text-sm text-gray-600">
            ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
          </span>
        </div>
      )}

      {/* Price */}
      <div className="mb-6">
        <PriceDisplay 
          price={product.price} 
          originalPrice={product.compareAtPrice} 
          size="xl" 
        />
      </div>

      {/* Additional information */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        {product.brand && (
          <div>
            <span className="text-gray-600">Marca:</span>
            <span className="ml-2 font-semibold">{product.brand}</span>
          </div>
        )}
        {product.sku && (
          <div>
            <span className="text-gray-600">SKU:</span>
            <span className="ml-2 font-mono text-xs">{product.sku}</span>
          </div>
        )}
        {product.stock !== undefined && (
          <div>
            <span className="text-gray-600">Estoque:</span>
            <span className={`ml-2 font-semibold ${
              product.stock === 0 ? 'text-red-600' : 
              product.stock < 5 ? 'text-orange-600' : 'text-green-600'
            }`}>
              {product.stock === 0 ? 'Esgotado' : `${product.stock} unidades`}
            </span>
          </div>
        )}
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {product.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-brand-off-white text-brand-text-button px-2 py-1 rounded border border-brand-dark-nude/20">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}