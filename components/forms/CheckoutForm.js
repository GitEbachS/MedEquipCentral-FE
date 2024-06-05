import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { closeOrder } from '../../api/orderData';

const intitialState = {
  creditCardNumber: '',
  expirationDate: '',
  cvv: '',
  zip: '',
};
const Checkout = ({ orderObj }) => {
  const router = useRouter();
  const { totalPrice } = router.query;
  const [formInput, setFormInput] = useState(intitialState);
  const [order, setOrder] = useState();
  const [person, setPerson] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === 'creditCardNumber' || name === 'cvv' || name === 'zip' ? Number(value) : value;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeOrder(person, order, formInput).then(() => router.push('/confirmation'));
  };
  useEffect(() => {
    if (orderObj) {
      // Ensure the form input is reset when orderObj changes
      setFormInput(intitialState);
      setOrder(orderObj.id);
      setPerson(orderObj.userId);
    }
  }, [orderObj]);

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Checkout Order</h1>
      <Form.Group className="mb-3">
        <Form.Label>Credit Card Number:</Form.Label>
        <Form.Control
          type="number"
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
          type="number"
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
          type="number"
          name="zip"
          value={formInput.zip}
          onChange={handleChange}
          placeholder="Zip"
          required
        />
      </Form.Group>

      <p>Total Amount Due: ${totalPrice}</p>
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
