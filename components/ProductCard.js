import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { addProductToOrder, deleteProductFromOrder } from '../api/orderProductData';
import { getCartIds, getSingleOrderDetails } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';

const ProductCard = ({ productObj }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [productCounts, setProductCounts] = useState({});
  const [viewOrderdetails, setViewOrderDetails] = useState({});
  const [buttonText, setButtonText] = useState('');

  const checkProduct = () => {
    const isProductAdded = cart.products?.some((productId) => productId === productObj.id);
    setButtonText(isProductAdded ? 'Remove From Order' : 'Add to Order');
  };

  const getOrder = async () => {
    const cartData = await getCartIds(user.id);
    setCart(cartData); // displays orderId with the list of Products: [id] in the order
    if (cartData.orderId) {
      const orderDetails = await getSingleOrderDetails(cartData.orderId, user.id);
      setViewOrderDetails(orderDetails);
    }
    checkProduct();
  };

  const productCount = () => {
    const counts = {};
    viewOrderdetails?.products.forEach((product) => {
      const productId = product.id;
      if (counts[productId]) {
        counts[productId] += 1;
      } else {
        counts[productId] = 1;
      }
    });
    return counts;
  };

  const handleButtonClick = async () => {
    const payload = {
      productId: productObj.id,
      orderId: cart.orderId,
    };
    if (buttonText === 'Add to Order') {
      await addProductToOrder(payload);
    } else {
      await deleteProductFromOrder(user.id, productObj.id);
    }
    getOrder();
  };

  useEffect(() => {
    if (viewOrderdetails.products) {
      const counts = productCount(viewOrderdetails.products);
      setProductCounts(counts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewOrderdetails]);

  useEffect(() => {
    getOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="card-style" style={{ height: '350px' }}>
      <Card.Body>
        <Link href={`/product/${productObj.id}`} passHref>
          <Image src={productObj.image} alt={productObj.name} style={{ height: '100px' }} />
        </Link>

        <div className="product-details">
          <h2>{productObj.name}</h2>
          <p>Price: ${productObj.price}</p>
          <p>Description: {productObj.description}</p>
          <p>Category: {productObj.category?.name}</p>
        </div>

        <div>
          {Object.keys(productCounts).map((productId) => (
            <p key={productId}>{`Product ID: ${productId}, Count: ${productCounts[productId]}`}</p>
          ))}
        </div>

        <div>
          <button type="button" onClick={handleButtonClick}>{buttonText}</button>
          <Link href={`/product/edit/${productObj.id}`} passHref>
            <button type="button">Edit Product</button>
          </Link>
        </div>
      </Card.Body>

    </Card>
  );
};

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    categoryId: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
