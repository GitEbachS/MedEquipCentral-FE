import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const updateUser = (userId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/updateUser/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/singleUser/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { updateUser, getSingleUser };
