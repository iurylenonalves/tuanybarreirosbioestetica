import { RatingStars } from './RatingStars';

interface Review {
  _id: string;
  customerName: string;
  rating: number;
  title?: string;
  comment?: string;
  verified?: boolean;
  createdAt: string;
}

interface ReviewsListProps {
  reviews: Review[];
  title?: string;
}

export function ReviewsList({ reviews, title = "Avaliações dos Clientes" }: ReviewsListProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-brand-off-white rounded-lg p-6 border border-brand-dark-nude/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                <RatingStars rating={review.rating} size="sm" />
              </div>
              {review.verified && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  ✓ Compra Verificada
                </span>
              )}
            </div>
            
            {review.title && (
              <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
            )}
            
            {review.comment && (
              <p className="text-gray-700 mb-3">{review.comment}</p>
            )}
            
            <span className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}