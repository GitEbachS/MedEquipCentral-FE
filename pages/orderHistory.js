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

  // const handleReorder = (orderId) => orderId;

  return (
    <div className="title-container historyGrid">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div className="flex-container" key={order.id}>
              <table className="historyTable">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Total Price</th>
                    <th>Date Closed </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#{order.id}</td>
                    <td>${order.total}</td>
                    <td>{order.closeDate ? `Date Closed: ${new Date(order.closeDate).toLocaleDateString('en-US')}` : ''}</td>
                    <td>{order.isClosed ? 'Closed' : 'Open'}</td>
                  </tr>
                </tbody>
              </table>
              <div className="history-btn-container">
                <Link href={`/order/${order.id}`} passHref>
                  <button className="history-btnActions detailsBtn" type="button">Order Details</button>
                </Link>

                {/* <button className="history-btnActions" type="button" onClick={() => handleReorder(order.id)}>Reorder</button> */}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
