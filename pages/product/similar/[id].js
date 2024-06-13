import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, Col, Image, Row,
} from 'react-bootstrap';
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
  const [buttonStates, setButtonStates] = useState({});

  const fetchUser = async () => {
    const userData = await getSingleUser(user.id);
    setCurrentUser(userData);
    return currentUser;
  };
  const viewProducts = async () => {
    const all = await getProducts();
    const single = await getSingleProduct(id);

    const similarProductsList = await getSimilarItems(id);
    const similarProductIds = similarProductsList.map((item) => item.id);

    const filteredProducts = all.filter(
      (product) => product.id !== single.id && !similarProductIds.includes(product.id),
    );

    setAllProducts(filteredProducts);
    setSingleProduct(single);
    setSimilarItems(similarProductsList);
  };

  const similarProductList = async () => {
    const similarProductsList = await getSimilarItems(id);
    setSimilarItems(similarProductsList);
    return similarProductsList;
  };

  const checkSimilarItems = async () => {
    const similarArray = await getSimilarItems(id);
    const similarItemIds = similarArray.map((item) => item.id);
    const newButtonStates = {};

    allProducts.forEach((product) => {
      newButtonStates[product.id] = similarItemIds.includes(product.id) ? '-' : '+';
    });

    setButtonStates(newButtonStates);
  };

  const handleListClick = async (productId) => {
    const similarray = await getSimilarItems(id);
    const isSimilarItem = similarray.map((item) => item.id);

    if (!isSimilarItem.includes(productId)) {
      const payload = {
        similarProductId: productId,
      };
      await addSimilarItem(singleProduct.id, user.id, payload);
      setAllProducts(allProducts.filter((product) => product.id !== productId));
      setButtonStates((prevState) => ({ ...prevState, [productId]: '-' }));
    } else {
      await deleteSimilarItem(id, productId, user.id);
      const updatedProducts = await getProducts();
      const similarProductsList = await getSimilarItems(id);

      const similarProductIds = similarProductsList.map((item) => item.id);

      const filteredProducts = updatedProducts.filter(
        (product) => product.id !== singleProduct.id && !similarProductIds.includes(product.id),
      );

      setAllProducts(filteredProducts);
      setButtonStates((prevState) => ({ ...prevState, [productId]: '+' }));
    }
    await similarProductList();
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (id) {
      viewProducts();
      similarProductList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    checkSimilarItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  return (
    <div>
      <div className="header-container">
        <h1>Product Details</h1>
        <h5>Admin Only</h5>
        <Row>
          {/* Single item */}
          <Col md={6}>
            <Card style={{ height: '350px' }}>
              <Card.Body>
                <div className="product-details card-style">
                  <h2>{singleProduct.name}</h2>
                  <Image src={singleProduct.image} alt={singleProduct.name} style={{ height: '100px' }} />
                  <p>Price: ${singleProduct.price}</p>
                  <p>Description: {singleProduct.description}</p>
                  <p><span className="category-name">Category:</span> {singleProduct.category?.name}</p>
                  {singleProduct.quantity > 0 && <p>Quantity: {singleProduct.quantity}</p>}
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Similar items */}
          <Col md={6}>
            <Row>
              {similarItems.map((similarItem) => (
                <Col key={similarItem.id} sm={6} md={4} style={{ margin: '5px 20px' }}>
                  <Card style={{ width: '200px' }}>
                    <Card.Body className="card-style">
                      <button type="button" className="similarBtnTwo" onClick={() => handleListClick(similarItem.id)}>-</button>
                      <Image src={similarItem.image} alt={similarItem.name} style={{ height: '70px' }} />
                      <div className="similarItem-details">
                        <h6>{similarItem.name}</h6>
                        <p><span className="category-name">Category:</span> {similarItem.category?.name}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      {/* Bottom section with all products */}

      <div className="similar-container">
        <h2 className="similar-title">Select Similar Items For The Product</h2>
        <Row xs={1} md={5}>
          {allProducts
            .filter((product) => product.id !== singleProduct.id)
            .map((product) => (
              <Col key={product.id}>
                <Card>
                  <Card.Body className="card-style">
                    <button className="similarBtn" type="button" onClick={() => handleListClick(product.id)}>{buttonStates[product.id]}</button>
                    <Image src={product.image} alt={product.name} style={{ height: '100px' }} />
                    <div className="product-details">
                      <h2>{product.name}</h2>
                      <p><span className="category-name">Category:</span> {product.category?.name}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
export default AddSimilarItems;
