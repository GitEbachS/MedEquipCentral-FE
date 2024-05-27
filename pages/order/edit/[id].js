import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Checkout from '../../../components/forms/CheckoutForm';
import { getSingleOrderDetails } from '../../../api/orderData';

export default function CloseOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrderDetails(id).then(setEditItem);
  }, [id]);

  return (<Checkout orderObj={editItem} />);
}
