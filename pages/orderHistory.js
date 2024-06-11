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
    <div className="title-container">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <div>Order ID: {order.id}</div>
              <div>Total Price: ${order.total}</div>
              <div>{order.closeDate ? `Date Closed: ${new Date(order.closeDate).toLocaleDateString('en-US')}` : ''}</div>

              <div>Status: {order.isClosed ? 'Closed' : 'Open'}</div>
              <div className="history-btnActions">
                <Link href={`/order/${order.id}`} passHref>
                  <button type="button">View Order Details</button>
                </Link>
                <button type="button" onClick={() => handleReorder(order.id)}>Reorder</button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
