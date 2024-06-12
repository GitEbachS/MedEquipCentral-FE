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
    <div className="container my-4">
      <div className="card p-4 userCard">
        <div className="row">
          <div className="col-md-4 text-center">
            <Image src={singleUser.image} alt="profile" className="rounded-circle" width={150} height={150} />
            <h2 className="userInfo mt-3">{singleUser.firstName} {singleUser.lastName}</h2>
            <h2 className="userInfo mt-3 email">{singleUser.email}</h2>
          </div>
          <div className="col-md-8" style={{ paddingLeft: '2rem' }}>
            <h2 className="userInfo">Address: {singleUser.address}</h2>
            <h2 className="userInfo">Job Function: {singleUser.jobFunction?.name}</h2>
            {singleUser.isBizOwner && <h2 className="userInfo"> Business Owner<Image src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg" alt="checkmark" className="checkmark" /></h2>}
            {singleUser.isAdmin && <h2 className="userInfo"> Admin<Image src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg" alt="checkmark" className="checkmark" /></h2>}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {userReviews.length === 0 ? (
          <h3 className="reviewTitle">No reviews found</h3>
        ) : (
          <>
            <h3 className="reviewTitle">Reviews:</h3>
            <div className="row">
              {userReviews.map((review) => (
                <div key={review.id} className="col-md-6 mb-4">
                  <div className="reviewCard">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <Image src={review.product?.image} alt="product" className="rounded" width={100} height={100} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{review.product?.name}</h5>
                          <div className="reviewHead d-flex justify-content-between align-items-center">
                            <div className="stars-container">
                              <div className="stars-backdrop">
                                ★★★★★
                              </div>
                              <div className="stars-overlay" style={{ width: `${(review.rating / 5) * 100}%` }}>
                                ★★★★★
                              </div>
                            </div>
                          </div>
                          <p className="card-text"><small className="text-muted">Created on {review.dateCreated}</small></p>
                          <p className="card-text">{review.commentReview}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-3 profile-btns">
        <Link href="/orderHistory" passHref>
          <button type="button" className="checkout-button">View Previous Orders</button>
        </Link>
        <Link href="/favoritesList" passHref>
          <button type="button" className="checkout-button">View Favorites List</button>
        </Link>
      </div>
    </div>
  );
}
