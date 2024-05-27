import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getFavoritesList = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${userId}/favoritesList`, {
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

const addToFavoriteslist = (userId, productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${userId}/favoritesList/${productId}`, {
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

const removeFromFavoriteslist = (userId, productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${userId}/favoritesList/${productId}`, {
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
  getFavoritesList, addToFavoriteslist, removeFromFavoriteslist,
};
