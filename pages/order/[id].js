import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../utils/context/authContext';
import { updateOrderProductQuantity } from '../../api/orderProductData';
import { getCartIds, getSingleOrderDetails } from '../../api/orderData';

export default function ViewOrder() {
  const router = useRouter();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState({});
  const [cart, setCart] = useState({});

  // const getOrderInfo = async () => {
  //   const getOrder = await getOrderDetails(userId, id);
  //   setOrderObj(getOrder);
  // };

  const fetchCart = async () => {
    const cartData = await getCartIds(user.id);
    setCart(cartData);
    return cartData;
  };

  const fetchOrderDetails = async (orderId) => {
    const orderDetails = await getSingleOrderDetails(user.id, orderId);
    setOrderData(orderDetails);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const payload = {
      productId,
      orderId: orderData.id,
      quantity: newQuantity,
    };
    updateOrderProductQuantity(payload).then(() => fetchCart());
  };
  const handleCheckout = () => {
    router.push(`/order/edit/${orderData.id}`);
  };

  useEffect(() => {
    if (user) {
      fetchCart().then((cartData) => {
        if (cartData.orderId) {
          fetchOrderDetails(cartData.orderId);
        }
      });
    }
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
        <h3>Order #{cart.orderId}</h3>
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
          <div key={product.id}>
            <ProductCard key={product.id} productObj={product} />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
              min="1"
            />
          </div>
        ))}

        <h3>Order Summary</h3>
        <p>Total Products: {orderData.totalProducts}</p>
        <p>Total Price: ${orderData.total ? orderData.total : 'N/A'}</p>
      </div>
      <div>
        <button type="button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
