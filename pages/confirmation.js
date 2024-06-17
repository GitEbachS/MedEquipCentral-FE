import React, { useEffect } from 'react';
import Link from 'next/link';

import { useAuth } from '../utils/context/authContext';

import { createOpenOrder } from '../api/orderData';

const OrderConfirmationPage = () => {
  const { user } = useAuth();

  const fetchUser = async () => {
    if (user && user.id) {
      await createOpenOrder(user.id);
    }
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container confirmationContainer">
      <div className="text-center mt-5">
        <h1 className="mb-4 confirmationTitle">Order Confirmation</h1>
        <p className="lead mb-3">Your order has been successfully submitted!</p>
        <p className="mb-4">Thank you for shopping with us.</p>
        <div className="d-flex justify-content-center">
          <Link href="/orderHistory" passHref>
            <button type="button" className="confirmationButton">View Order History</button>
          </Link>
          <Link href="/products" passHref>
            <button type="button" className="confirmationButton">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
