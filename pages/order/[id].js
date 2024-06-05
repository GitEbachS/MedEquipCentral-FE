import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../utils/context/authContext';
import { getSingleOrderHistory } from '../../api/orderData';

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

  return (
    <div>
      <h1>Order Details</h1>
      <div>
        {orderData.user && (
          <div key={orderData.user?.id} className="user-container">
            <Image src={orderData.user?.image} className="userImageReview" alt="User profile" />
            <p>{orderData.user?.firstName} {orderData.user?.lastName}</p>
          </div>
        )}
        <h3>Order #{orderData.orderId}</h3>
        <p>Total Products: {orderData.totalProducts}</p>
        <p>Total Price: ${orderData.total}</p>
        <p>Status: {orderData.isClosed ? 'Closed' : 'Open'}</p>
        <div className="order-details">
          <p>Credit Card Number: {orderData.creditCardNumber || 'N/A'}</p>
          <p>Expiration Date: {orderData.expirationDate || 'N/A'}</p>
          <p>CVV: {orderData.cvv || 'N/A'}</p>
          <p>Zip: {orderData.zip || 'N/A'}</p>
        </div>

        {orderData.products && orderData.products.map((product) => (
          <div>
            <ProductCard key={product.id} productObj={product} />

          </div>
        ))}

      </div>

    </div>
  );
}
