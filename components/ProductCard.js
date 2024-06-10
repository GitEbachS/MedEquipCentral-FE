import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { addProductToOrder, deleteProductFromOrder } from '../api/orderProductData';
import { getCartIds, getSingleOrderDetails } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';

import { addToFavoriteslist, getFavoritesList, removeFromFavoriteslist } from '../api/favoritesListData';

const ProductCard = ({ productObj, onDelete, isAdmin }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [viewOrderDetails, setViewOrderDetails] = useState({});
  const [productArray, setProductArray] = useState([]);
  const [listText, setListText] = useState('');
  const [buttonText, setButtonText] = useState('');

  const getOrder = async () => {
    const cartInfo = await getCartIds(user.id);
    setCart(cartInfo);
    setProductArray(cartInfo?.products || []);
  };

  const fetchOrderDetails = async () => {
    if (cart.orderId) {
      const orderDetails = await getSingleOrderDetails(user.id, cart.orderId);
      setViewOrderDetails(orderDetails);
    }
    return null;
  };

  const checkProduct = () => {
    const isProductAdded = productArray.some((productId) => productId === productObj.id);
    if (isProductAdded === true) {
      setButtonText('Remove From Order');
    } else {
      setButtonText('Add to Order');
    }
  };

  const handleButtonClick = async () => {
    try {
      const isProductAdded = productArray.some((productId) => productId === productObj.id);
      if (!isProductAdded) {
        const payload = {
          productId: productObj.id,
          orderId: cart.orderId,
        };
        await addProductToOrder(payload);
        setButtonText('Remove from Order');
        // Fetch and update the order details after modifying the cart
        const updatedOrderDetails = await getSingleOrderDetails(user.id, cart.orderId);
        setViewOrderDetails(updatedOrderDetails);
      } else {
        await deleteProductFromOrder(cart.orderId, productObj.id);
        setButtonText('Add to Order');
      }
      getOrder();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleListClick = async (productId) => {
    try {
      // Get the user's favorite list
      const userFavorites = await getFavoritesList(user.id);

      // Check if the product is already in the user's favorite list
      const isProductInFavorites = userFavorites.some((category) => category.products.some((product) => product.id === productId));

      if (!isProductInFavorites) {
        // If the product is not in the favorite list, add it
        await addToFavoriteslist(user.id, productId);
        setListText('Remove from Favorites');
      } else {
        await removeFromFavoriteslist(user.id, productId);
        setListText('Add to Favorites');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const checkFavList = async () => {
    try {
      const userFavorites = await getFavoritesList(user.id);

      // Flatten the products array
      const favProducts = userFavorites.flatMap((category) => category.products);

      // Check if the product is already in the user's favorite list
      const isProductInFavorites = favProducts.some((product) => product.id === productObj.id);

      if (isProductInFavorites) {
        setListText('Remove from Favorites');
      } else {
        setListText('Add to Favorites');
      }
    } catch (error) {
      console.error('Error fetching favorite list:', error);
    }
  };

  const productQuantityInOrder = () => {
    if (viewOrderDetails && viewOrderDetails?.products) {
      const orderProduct = viewOrderDetails.products.find((product) => product.id === productObj.id);
      return orderProduct ? orderProduct.quantity : 0;
    }
    return 0; // Default to 0 if viewOrderdetails or viewOrderdetails.products is undefined
  };

  useEffect(() => {
    checkFavList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, productObj]);

  useEffect(() => {
    getOrder();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, productObj]);

  useEffect(() => {
    fetchOrderDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    checkProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productArray]);

  return (
    <>
      <Card className="card">

        <div>
          {isAdmin && (
            <div className="adminActions">
              <button type="button" size="sm" onClick={() => onDelete(productObj.id)} className="deleteBtn m-2">
                Delete
              </button>
              <Link href={`/product/edit/${productObj.id}`} passHref>
                <button type="button">Edit</button>
              </Link>
            </div>
          )}
        </div>
        <Link href={`/product/${productObj.id}`} passHref>
          <Image src={productObj.image} alt={productObj.name} className="productImage" />
        </Link>
        <h2>{productObj.name}</h2>
        <div className="productDetails">

          <p>Price: ${productObj.price}</p>
          {/* <p>Description: {productObj.description}</p>
            <p>Category: {productObj.category?.name}</p> */}
          {productObj.quantity > 0 && <p>Quantity: {productObj.quantity}</p>}
          {productQuantityInOrder() > 0 && <p>&nbsp; |  &nbsp;{productQuantityInOrder()} in order</p>}
        </div>

        <div>
          <div className="card-btnActions">

            <button type="button" onClick={() => handleListClick(productObj.id)}>
              {listText}
            </button>
            <button type="button" onClick={handleButtonClick}>
              {buttonText}
            </button>

          </div>

        </div>

      </Card>

    </>
  );
};

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    categoryId: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  isAdmin: PropTypes.bool,
  onDelete: PropTypes.func,
};
ProductCard.defaultProps = {
  onDelete: null,
  isAdmin: null,
};

export default ProductCard;
