import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';
import UserForm from '../components/forms/UserForm';
import { createOpenOrder } from '../api/orderData';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    if (user && user.id) {
      const userData = await getSingleUser(user.id);
      setCurrentUser(userData);
      await createOpenOrder(user.id);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onUpdate = async () => {
    await fetchUser();
    router.push('/');
  };

  return (
    <>
      <h1>{currentUser === null ? 'Create an Account' : 'MedEquipCentral'}</h1>
      {currentUser === null ? (
        <UserForm onUpdate={onUpdate} />
      ) : (
        <div className="general-btns-container">
          <button type="button" onClick={() => router.push('/products')}>View All Products</button>
          <button type="button" onClick={() => router.push('/cart')}>View Cart</button>
          <button type="button" onClick={() => router.push('/profile')}>View Profile</button>
        </div>
      )}
    </>
  );
}

export default Home;
