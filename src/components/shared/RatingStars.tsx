interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${sizeClasses[size]}`}>
        {Array.from({ length: maxRating }, (_, index) => (
          <span 
            key={index} 
            className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
          >
            ⭐
          </span>
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}