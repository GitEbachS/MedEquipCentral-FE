import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../../api/userData';
import UserForm from '../../../components/forms/UserForm';

export default function UpdateProduct() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setEditItem);
  }, [id]);

  return (<UserForm userObj={editItem} />);
}
