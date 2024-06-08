import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/reviewData';
import StarRating from '../StarRating';

const intitialState = {
  rating: 0,
  commentReview: '',
};

export default function ReviewForm({ reviewObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const { productId } = router.query;
  const [reviewData, setReviewData] = useState(intitialState);

  useEffect(() => {
    if (reviewObj.id) setReviewData(reviewObj);
  }, [reviewObj, user]);

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (newRating) => {
    setReviewData((prevState) => ({
      ...prevState,
      rating: newRating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reviewObj?.id) {
        await updateReview(reviewObj.id, reviewData);
        router.push(`/product/${productId}`);
      } else {
        const newReviewData = { ...reviewData, productId, userId: user.id };
        await createReview(newReviewData);
      }
      router.push(`/product/${reviewObj.product?.id}`);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="userForm">
        <h1 className="text-white mt-5">{reviewObj.id ? 'Update' : 'Add'} Review</h1>
        <Form.Group className="mb-3">
          <Form.Label>Rating:</Form.Label>
          <StarRating rating={reviewData.rating} onRatingChange={handleRatingChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            id="commentReview"
            name="commentReview"
            value={reviewData.commentReview}
            onChange={handleChange}
            required

          />
        </Form.Group>
        <button type="submit">{reviewObj?.id ? 'Update Review' : 'Create Review'}</button>
      </Form>
    </>
  );
}

ReviewForm.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    commentReview: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.number,
    }),

  }),
};
ReviewForm.defaultProps = {
  reviewObj: intitialState,
};
