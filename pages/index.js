import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import { getSingleUser } from '../api/userData';
import UserForm from '../components/forms/UserForm';
import { filteredCategories, getCategories } from '../api/categoryData';
import { createOpenOrder } from '../api/orderData';

function Products() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [catProducts, setCatProducts] = useState([]);
  const [catButtons, setCatButtons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [order, setOrder] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // get the single user
  const fetchUser = async () => {
    setLoadingUser(true);
    const userData = await getSingleUser(user.id);
    setCurrentUser(userData);
    setIsAdmin(userData.isAdmin);
    const orderData = await createOpenOrder(user.id);
    setOrder(orderData);
    setLoadingUser(false);
  };

  // get all the product cards organized by their category
  const getAllProducts = async () => {
    setLoadingProducts(true);
    const catProductsData = await getCategories();
    setCatProducts(catProductsData);
    const catData = await getCategories();
    setCatButtons(catData);
    setLoadingProducts(false);
    return order;
  };

  // category filter onclick buttons
  const handleCategoryFilter = async (categoryName) => {
    try {
      const filteredProducts = await filteredCategories(categoryName);
      setCatProducts(filteredProducts);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error('Error filtering products by category:', error);
    }
  };

  // Reset product list to show all products
  const handleResetProducts = async () => {
    try {
      const catProductsData = await getCategories();
      setCatProducts(catProductsData);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error resetting products:', error);
    }
  };

  const onUpdate = () => {
    fetchUser();
    getAllProducts();
  };

  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getAllProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingUser || loadingProducts) {
    return <p>Loading...</p>;
  }

  // const filteredCatProducts = selectedCategory
  //   ? catProducts.filter((category) => category.name === selectedCategory)
  //   : catProducts;

  return (
    <>
      {currentUser == null ? (<h1>Create an Account</h1>) : (<h1>Products by Category</h1>)}
      {currentUser === null ? (
        <UserForm onUpdate={onUpdate} />
      ) : (
        <div>
          <div>
            <button type="button" onClick={handleResetProducts}>
              Show All Products
            </button>
            {catButtons.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => handleCategoryFilter(category.name)}
                disabled={selectedCategory === category.name}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div>
            <Link href="/product/new" passHref>
              <button type="button">Create Product</button>
            </Link>
          </div>
          {catProducts.length ? (
            catProducts.map((category) => (
              <div key={category.id}>
                <h2>{category.name}</h2>
                {category?.products.map((product) => (
                  <ProductCard key={product.id} productObj={product} isAdmin={isAdmin} onUpdate={getAllProducts} />
                ))}
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </>
  );
}

export default Products;
