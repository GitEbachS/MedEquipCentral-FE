import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Card, Col, Image, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import { getSingleProduct } from '../../api/productData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import { getSimilarItems } from '../../api/similarItemData';
import { deleteReview } from '../../api/reviewData';

export default function ViewProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const productData = async () => {
    const singleProduct = await getSingleProduct(id);
    const similarProds = await getSimilarItems(id);
    const userData = await getSingleUser(user.id);

    setIsAdmin(userData.isAdmin);
    setReviews(singleProduct.reviews);
    setProduct(singleProduct);
    setSimilarProducts(similarProds);
  };

  const handleUpdateProductClick = () => {
    router.push(`/product/edit/${id}`);
  };
  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId).then(() => productData());
  };
  useEffect(() => {
    productData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  return (
    <div className="title-container">
      <Link href={`/review/new?productId=${product.id}`} passHref>
        <button className="addReviewBtn" type="button">Add Review</button>
      </Link>
      <div>
        <h1 className="productBody">Product Details Page</h1>
      </div>
      <Row>
        <Col md={6}>
          <div className="header-container" key={product.id}>
            <Card style={{ height: '450px', marginTop: '60px' }}>

              <Card.Body>
                <div className="product-details card-style">

                  <Image src={product.image} alt={product.name} style={{ height: '150px' }} />
                  <h2>{product.name}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Description: {product.description}</p>
                  <p><span className="category-name">Category:</span> {product.category?.name}</p>
                  {isAdmin && (
                  <button className="checkout-button productUpdateBtn" type="button" onClick={handleUpdateProductClick}>Update Product</button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col md={6}>
          <div>
            {!similarProducts.length ? null : <h2>Similar Products:</h2>}

            <Row>
              {similarProducts.length && similarProducts.length > 0 ? (
                similarProducts.map((similarProduct) => (
                  <Col key={similarProduct.id} sm={6} md={4} style={{ margin: '5px 20px' }}>
                    <Card style={{ width: '200px' }}>
                      <Card.Body className="card-style">

                        <Image src={similarProduct.image} alt={similarProduct.name} style={{ height: '70px' }} />
                        <div className="similarItem-details">
                          <h6>{similarProduct.name}</h6>
                          <p>{similarProduct.description}</p>
                          <p>${similarProduct.price}</p>
                          <p><span className="category-name">Category:</span> {similarProduct.category?.name}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="reviewTitle">No similar products available.</p>
              )}
            </Row>
          </div>
        </Col>
      </Row>

      <div className="reviewContainer">
        {reviews.length && reviews.length > 0 ? (
          <>
            <h2 className="reviewTitle">Reviews:</h2>
            <div className="row">
              {reviews.map((review) => (
                <div key={review.id} className="col-md-6 mb-4">
                  <div className="reviewCard">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <Image src={review.user?.image} alt={review.user?.name} className="rounded" width={80} height={60} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{review.user?.firstName} {review.user?.lastName}</h5>
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
                          {review.userId === user.id && (
                            <div>
                              <Link href={`/review/edit/${review.id}`} passHref>
                                <button type="button" className="checkout-button">Edit Review</button>
                              </Link>
                              <button type="button" className="checkout-button" onClick={() => handleDeleteReview(review.id)}>
                                Delete Review
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="reviewTitle">No reviews available</p>
        )}
      </div>

    </div>
  );
}
