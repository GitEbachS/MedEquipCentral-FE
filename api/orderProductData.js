import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const addProductToOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/addProduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// update quantity amount for orderProducts
const updateOrderProductQuantity = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderProduct/quantity`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const deleteProductFromOrder = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/removeProduct/${orderId}/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});


export {
  addProductToOrder, deleteProductFromOrder, updateOrderProductQuantity,
};
