import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData';
import ReviewForm from '../../../components/forms/ReviewForm';

export default function UpdateReview() {
  const [editItem, setEditItem] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleReview(id).then(setEditItem);
  }, [id]);

  console.warn(editItem);

  return <ReviewForm reviewObj={editItem} />;
}
