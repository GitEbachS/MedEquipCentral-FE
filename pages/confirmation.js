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
          <button type="button" className="confirmationButton">View Order History</button>
        </Link>
        <Link href="/" passHref>
          <button type="button" className="confirmationButton">Continue Shopping</button>
        </Link>
      </div>
    </div>
  </div>
);

export default OrderConfirmationPage;
