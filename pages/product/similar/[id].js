import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Image } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { addSimilarItem, deleteSimilarItem, getSimilarItems } from '../../../api/similarItemData';
import { getProducts, getSingleProduct } from '../../../api/productData';
import { getSingleUser } from '../../../api/userData';

function AddSimilarItems() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [currentUser, setCurrentUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [similarItems, setSimilarItems] = useState([]);
  const [buttonText, setButtonText] = useState('');

  const fetchUser = async () => {
    const userData = await getSingleUser(user.id);
    setCurrentUser(userData);
    return currentUser;
  };
  const viewProducts = async () => {
    const all = await getProducts();
    const single = await getSingleProduct(id);

    setAllProducts(all);
    setSingleProduct(single);
  };

  const similarProductList = () => {
    getSimilarItems(id).then(setSimilarItems);
  };

  const checkSimilarItems = async () => {
    const similarray = await getSimilarItems(id);
    const isSimilarItem = similarray.some((item) => item.id === id);

    if (isSimilarItem) {
      setButtonText('-');
    } else {
      setButtonText('+');
    }
  };

  const handleListClick = (productId) => {
    if (!similarItems.id === productId) {
      const payload = {
        similarProductId: productId,
      };
      addSimilarItem(singleProduct.id, user.id, payload).then(() => viewProducts());
      setButtonText('-');
    } else {
      deleteSimilarItem(id, productId, user.id).then(() => viewProducts());
      setButtonText('+');
    }
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    checkSimilarItems();
    viewProducts();
    similarProductList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div>
        <h1>Select Similar Items For The Products</h1>
        <h2>**Admin Only**</h2>
        <div>
          <Card className="card-style" style={{ height: '200px' }}>
            <Card.Body>
              <div className="product-details">
                <h2>{singleProduct.name}</h2>
                <Image src={singleProduct.image} alt={singleProduct.name} style={{ height: '100px' }} />
                <p>Price: ${singleProduct.price}</p>
                <p>Description: {singleProduct.description}</p>
                <p>Category: {singleProduct.category?.name}</p>
                {singleProduct.quantity > 0 && <p>Quantity: {singleProduct.quantity}</p>}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="similar-container">
        {similarItems.map((similarProduct) => (
          <div>
            <Card className="card-style" style={{ height: '250px' }}>
              <Card.Body>

                <div className="similarProduct-details">
                  <h2>{similarProduct.name}</h2>
                  <p>Category: {similarProduct.category?.name}</p>
                </div>

              </Card.Body>

            </Card>

          </div>
        ))}
      </div>
      <div className="similar-container">
        {allProducts.map((product) => (
          <div>
            <Card className="card-style" style={{ height: '250px' }}>
              <Card.Body>
                <button type="button" onClick={() => handleListClick(product.id)}>{buttonText}</button>
                <Image src={product.image} alt={product.name} style={{ height: '100px' }} />

                <div className="product-details">
                  <h2>{product.name}</h2>
                  <p>Category: {product.category?.name}</p>
                </div>

              </Card.Body>

            </Card>

          </div>
        ))}
      </div>
    </div>
  );
}
export default AddSimilarItems;
