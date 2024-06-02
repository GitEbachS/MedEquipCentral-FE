import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products`, {
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

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/product/new`, {
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

const searchProducts = (query) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/search/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProduct = (productId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/update/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteProduct, updateProduct, getProducts, getSingleProduct, searchProducts, createProduct,
};
