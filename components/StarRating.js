import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating, onRatingChange }) => {
  const handleRating = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => handleRating(star)}
          role="button"
          aria-label={`${star} stars`}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? handleRating(star) : null)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default StarRating;
