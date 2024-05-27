import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/reviewData';

const intitialState = {
  rating: 0,
  commentReview: '',
};

const ReviewForm = ({ reviewObj, productId, onSubmit }) => {
  const { user } = useAuth();
  const router = useRouter;
  const [reviewData, setReviewData] = useState(intitialState);

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reviewObj?.id) {
        await updateReview(reviewObj.id, reviewData);
      } else {
        const newReviewData = { ...reviewData, productId, userId: user.id };
        await createReview(newReviewData);
      }
      onSubmit(); // Notify parent component of the submission
      router.push('/product-details'); // Redirect to product details page
    } catch (error) {
      console.error('Failed to submit review:', error);
    // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={reviewData.rating}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />
      <label htmlFor="commentReview">Comment:</label>
      <textarea
        id="commentReview"
        name="commentReview"
        value={reviewData.commentReview}
        onChange={handleChange}
        required
      />
      <button type="submit">{reviewObj?.id ? 'Update Review' : 'Create Review'}</button>
    </form>
  );
};

ReviewForm.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    commentReview: PropTypes.string,
  }),
  productId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
ReviewForm.defaultProps = {
  reviewObj: intitialState,
};
export default ReviewForm;
