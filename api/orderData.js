import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrderTotal = (orderId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/total/${orderId}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// object that has orderId and list of Products: [ids]
const getCartIds = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOpenOrder = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/create/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const closeOrder = (userId, orderId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${userId}/update/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrderDetails = (userId, orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${userId}/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrderHistory = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderHistory/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getOrderTotal, getOrderHistory, closeOrder, createOpenOrder, getCartIds, getSingleOrderDetails,
};
