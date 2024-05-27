import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { closeOrder, getOrderTotal } from '../../api/orderData';

const intitialState = {
  creditCardNumber: -1,
  expirationDate: '',
  cvv: -1,
  zip: -1,
};
const Checkout = ({ orderObj }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState(intitialState);
  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeOrder({ ...formInput, orderId: orderObj.id, userId: orderObj.userId }).then(() => router.router.push('/confirmation'));
  };

  useEffect(() => {
    const fetchOrderTotal = async () => {
      try {
        const totalData = await getOrderTotal(orderObj.id, orderObj.userId);
        setTotal(totalData.total);
      } catch (error) {
        // Handle error
      }
    };
    fetchOrderTotal();
  }, [orderObj]);

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Checkout Order</h1>
      <Form.Group className="mb-3">
        <Form.Label>Credit Card Number:</Form.Label>
        <Form.Control
          name="creditCardNumber"
          value={formInput.creditCardNumber}
          onChange={handleChange}
          placeholder="Credit Card Number"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Expiration Date:</Form.Label>
        <Form.Control
          name="expirationDate"
          value={formInput.expirationDate}
          onChange={handleChange}
          placeholder="Expiration Date: MM/YY"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>CCV:</Form.Label>
        <Form.Control
          name="cvv"
          value={formInput.cvv}
          onChange={handleChange}
          placeholder="CVV"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zip Code:</Form.Label>
        <Form.Control
          name="zip"
          value={formInput.zip}
          onChange={handleChange}
          placeholder="Zip"
          required
        />
      </Form.Group>

      <p>Total Amount Due: ${total}</p>
      <button type="submit">Submit Order</button>
    </Form>
  );
};

Checkout.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    totalProducts: PropTypes.number,
    total: PropTypes.number,
    creditCardNumber: PropTypes.number,
    expirationDate: PropTypes.string,
    cvv: PropTypes.number,
    zip: PropTypes.number,
    userId: PropTypes.number,
    isClosed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Checkout;
// const Cart = () => {
//   const { userId, orderId } = useParams();
//   const history = useHistory();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const orderData = await getTheSingleOrder(userId, orderId);
//         setOrder(orderData);
//       } catch (error) {
//         setError('Failed to fetch order details.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [userId, orderId]);

//   const handleRemoveProduct = async (productId) => {
//     try {
//       await removeProductFromOrder(orderId, productId);
//       const updatedOrder = await getTheSingleOrder(userId, orderId);
//       setOrder(updatedOrder);
//     } catch (error) {
//       setError('Failed to remove product from order.');
//     }
//   };

//   const handleCheckout = () => {
//     history.push(`/checkout/${userId}/${orderId}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h1>Order Details</h1>
//       {order ? (
//         <div>
//           <h2>Order ID: {order.id}</h2>
//           <h3>User Information</h3>
//           <p>Name: {order.user.firstName} {order.user.lastName}</p>
//           <p>Email: {order.user.email}</p>
//           <p>Address: {order.user.address}</p>
//           <h3>Products</h3>
//           {order.products.length > 0 ? (
//             order.products.map(product => (
//               <div key={product.id}>
//                 <h4>{product.name}</h4>
//                 <img src={product.image} alt={product.name} />
//                 <p>Category: {product.category.name}</p>
//                 <p>Description: {product.description}</p>
//                 <p>Price: ${product.price}</p>
//                 <button onClick={() => handle
