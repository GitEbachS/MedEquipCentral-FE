/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';
import { getReviewsByUserId } from '../api/reviewData';

export default function Profile() {
  const [singleUser, setSingleUser] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const { user } = useAuth();

  const getUserDetails = () => {
    getSingleUser(user.id).then(setSingleUser);
  };

  const allReviews = () => {
    getReviewsByUserId(user.id).then(setUserReviews);
  };

  useEffect(() => {
    getUserDetails();
    allReviews();
  }, [user]);

  return (
    <>
      <div>
        <Image src={singleUser.image} alt="profile" style={{ borderRadius: '50%', width: 150, height: 150 }} />
        <div>
          <h2>{singleUser.firstName} {singleUser.lastName}</h2>
          <h2>{singleUser.email}</h2>
        </div>
      </div>
      <div>
        <h2>{singleUser.address}</h2>
        <h2>{singleUser.jobFunction?.name}</h2>
        {singleUser.isBizOwner && <h2>Business Owner</h2>}
        {singleUser.isAdmin && <h2>Admin</h2>}
      </div>
      <div>
        {userReviews.length === 0 && ('No reviews found')}
        {!!userReviews.length && (userReviews.map((review) => (
          <div key={review.id}>
            <div style={{ width: '100%' }}>
              <div className="reviewHead">
                <div className="stars-container">
                  <div className="stars-backdrop">
                    ★★★★★
                  </div>
                  <div className="stars-overlay" style={{ width: `${(review.rating / 5) * 100}%` }}>
                    ★★★★★
                  </div>
                </div>
                <p style={{ opacity: '50%' }}>By {singleUser.name} on {review.dateCreated}</p>
                <p>{review.commentReview}</p>
              </div>
            </div>
          </div>
        )))}
      </div>
      <Link href="/orderHistory" passHref>
        <button type="button">View Previous Orders</button>
      </Link>
      <Link href="/favoritesList" passHref>
        <button type="button">View Favorites List</button>
      </Link>
    </>
  );
}
