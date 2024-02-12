import React from 'react';
import { Star } from './Star';


interface RatingDisplayProps {
  rating: number;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="rating-display">
      {[...Array(filledStars)].map((_, index) => (
        <Star key={index} filled={true} />
      ))}
      {hasHalfStar && <Star filled={false} />}
      {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <Star key={index + filledStars + (hasHalfStar ? 1 : 0)} filled={false} />
      ))}
    </div>
  );
};

export default RatingDisplay;