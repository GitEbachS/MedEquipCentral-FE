import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getOrderHistory } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userOrders = await getOrderHistory(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserOrders();
  }, [user]);

  const handleReorder = (orderId) => orderId;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <div>Order ID: {order.id}</div>
              <div>Total Price: ${order.total}</div>
              <div>Status: {order.isClosed ? 'Closed' : 'Open'}</div>
              <Link href={`/order/${order.id}`} passHref>
                <button type="button">View Details</button>
              </Link>
              <button type="button" onClick={() => handleReorder(order.id)}>Reorder</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
