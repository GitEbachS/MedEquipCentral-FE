import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSingleProduct } from '../../api/productData';
import { getSimilarItems } from '../../api/similarItemData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';

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

  useEffect(() => {
    productData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  return (
    <div key={product.id}>
      <h1>{product.name}</h1>
      <Image src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category?.name}</p>
      {isAdmin && (
      <button type="button" onClick={handleUpdateProductClick}>Update Product</button>
      )}
      <div>
        <h2>Reviews</h2>
        {reviews.length && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id}>
              <div>
                <h3>{review?.user.firstName} {review?.user.lastName}</h3>
                <Image src={review?.user.image} alt={review.user?.name} />
              </div>
              <p>Rating: {review.rating}</p>
              <p>Rating: {review.dateCreated}</p>
              <p>{review.commentReview}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
      <div>
        <h2>Similar Products</h2>
        {similarProducts.length && similarProducts.length > 0 ? (
          similarProducts.map((similarProduct) => (
            <div key={similarProduct.id}>
              <h3>{similarProduct.name}</h3>
              <Image src={similarProduct.image} alt={similarProduct.name} />
              <h3>{similarProduct.description}</h3>
              <h3>{similarProduct.price}</h3>
              <h3>{similarProduct.category?.name}</h3>
            </div>
          ))
        ) : (
          <p>No similar products available.</p>
        )}
      </div>
    </div>
  );
}
