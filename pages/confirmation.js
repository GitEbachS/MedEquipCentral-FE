import React from 'react';
import Link from 'next/link';

const OrderConfirmationPage = () => (
  <div>
    <h1>Order Confirmation</h1>
    <p>Your order has been successfully submitted!</p>
    <p>Thank you for shopping with us.</p>
    <Link href="/orderHistory">View Order History</Link>
    <Link href="/products">Continue Shopping</Link>
  </div>
);

export default OrderConfirmationPage;
