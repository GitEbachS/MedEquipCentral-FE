import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Checkout from '../../../components/forms/CheckoutForm';
import { getSingleOrderDetails } from '../../../api/orderData';
import { useAuth } from '../../../utils/context/authContext';

export default function CloseOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const orderId = Number(id);

  useEffect(() => {
    getSingleOrderDetails(user.id, orderId).then(setEditItem);
  }, [user, orderId]);

  return (<Checkout orderObj={editItem} />);
}
