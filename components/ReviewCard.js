import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({
  reviewObj, isCurrentUser, editReview, deleteReview,
}) => {
  const handleEditReview = () => {
    // Placeholder for edit review API call
    editReview(reviewObj.id);
  };

  const handleDeleteReview = () => {
    // Placeholder for delete review API call
    deleteReview(reviewObj.id);
  };

  return (
    <div className="reviewCard">
      <div key={reviewObj.userId}>
        <Image src={reviewObj?.user.image} className="userImageReview" alt="User profile" />
        <p>{reviewObj?.user.name}</p>
      </div>

      <div style={{ width: '100%' }}>
        <div className="reviewHead">
          <div className="stars-container">
            <div className="stars-backdrop">
              ★★★★★
            </div>
            <div className="stars-overlay" style={{ width: `${(reviewObj.rating / 5) * 100}%` }}>
              ★★★★★
            </div>
          </div>
          <p style={{ opacity: '50%' }}>By {reviewObj?.user.name} on {reviewObj.dateCreated}</p>
        </div>
        <p>{reviewObj.commentReview}</p>
        {isCurrentUser && (
        <div className="review-card-btn-container">
          <Button type="button" className="review-card-btn" variant="dark" onClick={handleEditReview}>
            <FontAwesomeIcon icon={faPencil} style={{ color: '#683ce4' }} />
          </Button>
          <Button type="button" className="review-card-btn" variant="dark" onClick={handleDeleteReview}>
            <FontAwesomeIcon icon={faTrash} style={{ color: '#683ce4' }} />
          </Button>
        </div>
        )}
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    commentReview: PropTypes.string,
    dateCreated: PropTypes.string,
    userId: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  editReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

export default ReviewCard;
