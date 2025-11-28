import { RatingStars } from '@/components/shared/RatingStars';
import { PriceDisplay } from '@/components/shared/PriceDisplay';

interface ServicePackage {
  name: string;
  category?: {
    name: string;
  };
  popular?: boolean;
  featured?: boolean;
  price: number;
  originalPrice?: number;
  sessions?: number;
  duration?: string;
  shortDescription?: string;
}

interface Review {
  rating: number;
}

interface ServiceInfoProps {
  servicePackage: ServicePackage;
  reviews: Review[];
}

export function ServiceInfo({ servicePackage, reviews }: ServiceInfoProps) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-2">
        {servicePackage.category && (
          <span className="text-sm text-brand-text-button bg-brand-pink-light px-2 py-1 rounded border border-brand-dark-nude/20">
            {servicePackage.category.name}
          </span>
        )}
        {servicePackage.popular && (
          <span className="text-sm text-yellow-600 px-2 py-1 rounded">
            🔥 Mais Procurado
          </span>
        )}
        {servicePackage.featured && (
          <span className="text-sm text-purple-600 px-2 py-1 rounded">
            ⭐ Destaque
          </span>
        )}
      </div>

      {/* Service name */}
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
        {servicePackage.name}
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
          price={servicePackage.price} 
          originalPrice={servicePackage.originalPrice} 
          size="xl" 
        />
      </div>

      {/* Package Information */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        {servicePackage.sessions && (
          <div>
            <span className="text-gray-600">Sessões:</span>
            <span className="ml-2 font-semibold">{servicePackage.sessions}</span>
          </div>
        )}
        {servicePackage.duration && (
          <div>
            <span className="text-gray-600">Duração:</span>
            <span className="ml-2 font-semibold">{servicePackage.duration}</span>
          </div>
        )}
      </div>

      {/* Short Description */}
      {servicePackage.shortDescription && (
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          {servicePackage.shortDescription}
        </p>
      )}
    </div>
  );
}