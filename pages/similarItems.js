import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getProducts } from '../api/productData';
import { getSingleUser } from '../api/userData';
import SimilarItemsCard from '../components/SimilarItemsCard';

function SimilarItems() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const fetchUser = async () => {
    const userData = await getSingleUser(user.id);
    setCurrentUser(userData);
    return currentUser;
  };
  const viewProducts = () => {
    getProducts().then(setAllProducts);
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    viewProducts();
  }, []);

  return (
    <Container>
      <div className="text-center my-4 header-container">
        <h1>Select Similar Items For The Products</h1>
        <h5>Admin Only</h5>
      </div>
      <Row>
        {allProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={2} className="mb-4">
            <SimilarItemsCard productObj={product} onUpdate={viewProducts} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default SimilarItems;
