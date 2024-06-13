import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateReview = (reviewId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/update/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleReview = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/singleReview/${reviewId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteReview = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/delete/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getReviewsByUserId = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/review/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching user reviews:', error);
      reject(error);
    });
});

export {
  deleteReview, updateReview, createReview, getReviewsByUserId, getSingleReview,
};
