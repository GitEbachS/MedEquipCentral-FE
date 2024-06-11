import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getProducts } from '../api/productData';
import { getSingleUser } from '../api/userData';
import SimilarItemsCard from '../components/SimilarItemsCard';

function SimilarItems() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const fetchUser = async () => {
    const userData = await getSingleUser(user.id);
    setCurrentUser(userData);
    return currentUser;
  };
  const viewProducts = () => {
    getProducts().then(setAllProducts);
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    viewProducts();
  }, []);

  return (
    <div>
      <div>
        <h1>Select Similar Items For The Products</h1>
        <h2>**Admin Only**</h2>
      </div>
      {allProducts.map((product) => (
        <SimilarItemsCard key={product.id} productObj={product} onUpdate={viewProducts} />
      ))}
    </div>
  );
}
export default SimilarItems;
