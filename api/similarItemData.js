import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSimilarItems = (productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${productId}/similar`, {
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

const addSimilarItem = (productId, userId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${productId}/similar/${userId}`, {
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

const deleteSimilarItem = (productId, similarProductId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${productId}/removeSimilarProduct/${similarProductId}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getSimilarItems, addSimilarItem, deleteSimilarItem,
};
