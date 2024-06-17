import {
  Card, Image,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSingleOrderHistory } from '../../api/orderData';
import ProductCard from '../../components/ProductCard';
import { deleteProductFromOrder } from '../../api/orderProductData';

export default function ViewOrder() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [orderData, setOrderData] = useState({});

  const fetchOrderDetails = () => {
    getSingleOrderHistory(user.id, id).then(setOrderData);
  };

  useEffect(() => {
    fetchOrderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleRemoveFromOrder = async (productId) => {
    try {
      // Implement logic to remove product from order using orderData and product ID
      const updatedProducts = orderData.products.filter((product) => product.id !== productId);
      const updatedOrderData = { ...orderData, products: updatedProducts };
      setOrderData(updatedOrderData);

      // Implement API call or logic to update backend if necessary
      await deleteProductFromOrder(orderData.id, productId);
    } catch (error) {
      console.error('Error occurred while removing product from order:', error);
    }
  };

  return (
    <div className="title-container">
      <h1>Order Details</h1>
      <div>
        {orderData.user && (
          <div key={orderData.user?.id} className="">
            <Image src={orderData.user?.image} className="userImageReview" alt="User profile" />
            <p>{orderData.user?.firstName} {orderData.user?.lastName}</p>
          </div>
        )}
        <Card className="order-card">
          <Card.Body>
            <Card.Title>Order #{orderData.orderId}</Card.Title>
            <Card.Text>Total Products: {orderData.totalProducts}</Card.Text>
            <Card.Text>Total Price: ${orderData.total}</Card.Text>
            <Card.Text>{orderData.closeDate ? `Date Closed: ${orderData.closeDate}` : ''}</Card.Text>
            <Card.Text>Status: {orderData.isClosed ? 'Closed' : 'Open'}</Card.Text>
            <div className="order-details">
              <Card.Text>Credit Card Number: {orderData.creditCardNumber || 'N/A'}</Card.Text>
              <Card.Text>Expiration Date: {orderData.expirationDate || 'N/A'}</Card.Text>
              <Card.Text>CVV: {orderData.cvv || 'N/A'}</Card.Text>
              <Card.Text>Zip: {orderData.zip || 'N/A'}</Card.Text>
            </div>
          </Card.Body>
        </Card>

        {orderData.products && (
          <div className="title-container">
            <h1>Products In Order:</h1>
            <div className="chartGrid">

              {orderData.products.map((product) => (
                <div key={product.id}>
                  <ProductCard productObj={product} onRemoveFromOrder={handleRemoveFromOrder} isClosed={orderData.isClosed} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
