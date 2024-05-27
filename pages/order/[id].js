import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../utils/context/authContext';
import { updateOrderProductQuantity } from '../../api/orderProductData';
import { getSingleOrderDetails } from '../../api/orderData';

export default function ViewOrder() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [orderData, setOrderData] = useState({});

  // const getOrderInfo = async () => {
  //   const getOrder = await getOrderDetails(userId, id);
  //   setOrderObj(getOrder);
  // };

  const orderInfo = () => {
    getSingleOrderDetails(user.id, id)?.then(setOrderData);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const payload = {
      productId,
      orderId: id,
      quantity: newQuantity,
    };
    updateOrderProductQuantity(payload).then(() => orderInfo());
  };
  const handleCheckout = () => {
    router.push(`/order/edit/${id}`);
  };

  useEffect(() => {
    orderInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      <div>
        <div key={orderData?.user.id} className="user-container">
          <Image src={orderData?.user.image} className="userImageReview" alt="User profile" />
          <p>{orderData?.user.firstName} {orderData?.user.lastName}</p>
        </div>
        <h3>Order #{orderData.id}</h3>
        <p>Total Products: {orderData.totalProducts}</p>
        <p>Total Price: ${orderData.total.toFixed(2)}</p>
        <p>Status: {orderData.isClosed ? 'Closed' : 'Open'}</p>
        <div className="order-details">
          <p>Credit Card Number: {orderData.creditCardNumber || 'N/A'}</p>
          <p>Expiration Date: {orderData.expirationDate || 'N/A'}</p>
          <p>CVV: {orderData.cvv || 'N/A'}</p>
          <p>Zip: {orderData.zip || 'N/A'}</p>
        </div>
        {orderData.products && orderData.products.length > 0 ? (
          orderData?.products.map((product) => (
            <div key={product.id}>
              <ProductCard productObj={product} />
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                min="1"
              />
            </div>
          ))
        ) : (
          <p>No products found in the order</p>
        )}

        <h3>Order Summary</h3>
        <p>Total Products: {orderData.totalProducts}</p>
        <p>Total Price: ${orderData.total.toFixed(2)}</p>
      </div>
      <div>
        <button type="button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
