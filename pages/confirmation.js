import React from 'react';
import Link from 'next/link';

const OrderConfirmationPage = () => (
  <div className="container confirmationContainer">
    <div className="text-center mt-5">
      <h1 className="mb-4 confirmationTitle">Order Confirmation</h1>
      <p className="lead mb-3">Your order has been successfully submitted!</p>
      <p className="mb-4">Thank you for shopping with us.</p>
      <div className="d-flex justify-content-center">
        <Link href="/orderHistory" passHref>
          <p className="btn btn-primary mx-2 confirmationButton">View Order History</p>
        </Link>
        <Link href="/products" passHref>
          <p className="btn btn-secondary mx-2 confirmationButton">Continue Shopping</p>
        </Link>
      </div>
    </div>
  </div>
);

export default OrderConfirmationPage;
