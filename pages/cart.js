import { Form, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getCartIds, getSingleOrderDetails } from '../api/orderData';
import { deleteProductFromOrder, updateOrderProductQuantity } from '../api/orderProductData';
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

  const calculateTotals = (products) => {
    const totalQty = products.reduce((acc, product) => acc + product.quantity, 0);
    const priceTotal = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
    setTotalProducts(totalQty);
    setTotalPrice(priceTotal.toFixed(2));
  };

  const fetchOrderDetails = async (orderId) => {
    const orderDetails = await getSingleOrderDetails(user.id, orderId);
    setOrderData(orderDetails);
    calculateTotals(orderDetails.products); // Calculate totals after setting order data
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

  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this product from your cart?');
    if (isConfirmed) {
      try {
        await deleteProductFromOrder(orderData.id, productId);
        const updatedProducts = orderData.products.filter((product) => product.id !== productId);
        setOrderData({ ...orderData, products: updatedProducts });
        calculateTotals(updatedProducts);
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
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
  }, [user, orderData]);

  return (
    <div className="title-container">
      <h1>Order Details</h1>
      <div>
        {orderData.user && (
          <div key={orderData.user.id} className="order-container">
            <div>
              <Image src={orderData.user.image} className="userImageReview" alt="User profile" />
              <p>{orderData.user.firstName} {orderData.user.lastName}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total Products</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#{cart.orderId}</td>
                  <td>{totalProducts}</td>
                  <td>${totalPrice}</td>
                  <td>{orderData.isClosed ? 'Closed' : 'Open'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {!orderData.products && <p>No products in the order, yet!</p>}
        {orderData.products && (
          <div className="product-list">
            <h2>Products In Order:</h2>
            {orderData.products.map((product) => (
              <div key={product.id} className="product-item">
                <ProductCard productObj={product} onDelete={handleDelete} />
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      key={`${product.id}-input`}
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                      min="1"
                    />
                  </Form.Group>
                </Form>
              </div>
            ))}
          </div>
        )}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <table>
            <tbody>
              <tr>
                <th>Total Products</th>
                <td>{totalProducts}</td>
              </tr>
              <tr>
                <th>Total Price</th>
                <td>${totalPrice}</td>
              </tr>
              {/* Add more rows for additional summary details if needed */}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button className="checkout-button" type="button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
