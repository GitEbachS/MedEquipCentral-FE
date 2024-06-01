import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { addProductToOrder, deleteProductFromOrder } from '../api/orderProductData';
import { getCartIds, getSingleOrderDetails } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';

const ProductCard = ({ productObj, onDelete, isAdmin }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [viewOrderDetails, setViewOrderDetails] = useState({});
  const [buttonText, setButtonText] = useState('');

  const getOrder = async () => {
    const cartData = await getCartIds(user.id);
    setCart(cartData);
  };

  const fetchOrderDetails = async () => {
    if (cart?.orderId) {
      const orderDetails = await getSingleOrderDetails(user.id, cart.orderId);
      setViewOrderDetails(orderDetails);
    }
    return null;
  };

  const checkProduct = () => {
    const isProductAdded = cart.products?.some((productId) => productId === productObj.id);
    if (isProductAdded === true) {
      setButtonText('Remove From Order');
    } else {
      setButtonText('Add to Order');
    }
  };

  const handleButtonClick = async () => {
    try {
      const isProductAdded = cart.products?.some((productId) => productId === productObj.id);
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
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const productQuantityInOrder = () => {
    if (viewOrderDetails && viewOrderDetails.products) {
      const orderProduct = viewOrderDetails.products.find((product) => product.id === productObj.id);
      return orderProduct ? orderProduct.quantity : 0;
    }
    return 0; // Default to 0 if viewOrderdetails or viewOrderdetails.products is undefined
  };
  useEffect(() => {
    getOrder();
    fetchOrderDetails();
    checkProduct();
    productQuantityInOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, productObj]);

  useEffect(() => {
    checkProduct();
    productQuantityInOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, buttonText]);
  return (
    <div>
      <Card className="card-style" style={{ height: '450px' }}>
        <Card.Body>
          <Link href={`/product/${productObj.id}`} passHref>
            <Image src={productObj.image} alt={productObj.name} style={{ height: '100px' }} />
          </Link>

          <div className="product-details">
            <h2>{productObj.name}</h2>
            <p>Price: ${productObj.price}</p>
            <p>Description: {productObj.description}</p>
            <p>Category: {productObj.category?.name}</p>
            {productQuantityInOrder() > 0 && <p>{productQuantityInOrder()} in order</p>}
          </div>

          {isAdmin && (
          <div>
            <div>
              <button type="button" onClick={handleButtonClick}>
                {buttonText}
              </button>

              <Link href={`/product/edit/${productObj.id}`} passHref>
                <button type="button">Edit Product</button>
              </Link>
            </div>
            <div>
              <button type="button" size="sm" onClick={() => onDelete(productObj.id)} className="deleteBtn m-2">
                DELETE
              </button>
            </div>
          </div>

          )}

        </Card.Body>

      </Card>

    </div>
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
  isAdmin: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};
ProductCard.defaultProps = {
  onDelete: null,
};

export default ProductCard;
