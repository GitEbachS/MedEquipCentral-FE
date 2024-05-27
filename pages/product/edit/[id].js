import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../api/productData';
import ProductForm from '../../../components/forms/ProductForm';

export default function UpdateProduct() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setEditItem);
  }, [id]);

  return (<ProductForm productObj={editItem} />);
}
