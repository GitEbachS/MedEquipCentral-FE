import { Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getCartIds, getSingleOrderDetails } from '../api/orderData';
import { updateOrderProductQuantity } from '../api/orderProductData';
import { useAuth } from '../utils/context/authContext';

export default function Cart() {
  const router = useRouter();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState({});
  const [cart, setCart] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);

  const fetchCart = async () => {
    const cartData = await getCartIds(user.id);
    setCart(cartData);
    return cartData;
  };

  const fetchOrderDetails = async (orderId) => {
    const orderDetails = await getSingleOrderDetails(user.id, orderId);
    setOrderData(orderDetails);
  };

  const calculateTotals = (products) => {
    const totalQty = products.reduce((acc, product) => acc + product.quantity, 0);
    const priceTotal = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
    setTotalProducts(totalQty);
    setTotalPrice(priceTotal.toFixed(2));
  };

  const handleQuantityChange = async (productid, newQuantity) => {
    if (newQuantity < 1) return; // Ensure quantity is at least 1

    const payload = {
      productId: productid,
      orderId: cart.orderId,
      quantity: newQuantity,
    };

    try {
      await updateOrderProductQuantity(payload);
      const updatedProducts = orderData.products.map((product) => (product.id === productid ? { ...product, quantity: newQuantity } : product));
      setOrderData({ ...orderData, products: updatedProducts });
      calculateTotals(updatedProducts);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = () => {
    router.push(`/order/edit/${orderData.id}?totalPrice=${totalPrice}`);
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
        <p>Total Products: {totalProducts}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Status: {orderData.isClosed ? 'Closed' : 'Open'}</p>

        {orderData.products && orderData.products.map((product) => (
          <div>
            <ProductCard key={product.id} productObj={product} />
            <input
              key={`${product.id}-input`}
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
              min="1"

            />

          </div>
        ))}

        <h3>Order Summary</h3>
        <p>Total Products: {totalProducts}</p>
        <p>Total Price: ${totalPrice}</p>
      </div>
      <div>
        <button type="button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
