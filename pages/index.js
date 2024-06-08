import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import { getSingleUser } from '../api/userData';
import UserForm from '../components/forms/UserForm';
import { filteredCategories, getCategories } from '../api/categoryData';
import { createOpenOrder } from '../api/orderData';
import { deleteProduct } from '../api/productData';

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

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm('Delete this product?');
    if (isConfirmed) {
      deleteProduct(productId)
        .then(() => {
          setCatProducts((prevState) => {
            // Filter out the deleted product from the state
            const updatedProducts = prevState.map((category) => ({
              ...category,
              products: category.products.filter((product) => product.id !== productId),
            }));
            return updatedProducts;
          });
        })
        .catch((err) => {
          console.error('Error deleting post:', err);
        });
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
  // Ensure catProducts is an array before accessing its length
  const isCatProductsAvailable = Array.isArray(catProducts);
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
          <div className="categoryButtons">
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
          {isCatProductsAvailable && catProducts.length > 0 ? (
            <div className="general-cards-container">
              {catProducts.map((category) => (
                <div key={category.id}>
                  <h2 className="categeoryLabel">{category.name}</h2>
                  <div className="grid">
                    {category?.products.map((product) => (
                      <div key={product.id} className="card">
                        <ProductCard productObj={product} isAdmin={isAdmin} onDelete={handleDelete} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </>
  );
}

export default Products;
