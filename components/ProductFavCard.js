import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { removeFromFavoriteslist } from '../api/favoritesListData';

const FavoritesProductCard = ({ productObj, onUpdate }) => {
  const { user } = useAuth();

  const handleListClick = () => {
    removeFromFavoriteslist(user.id, productObj.id).then(() => onUpdate());
  };

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
            <p>Category: {productObj.category}</p>
          </div>

          <div>
            <div>
              <button type="button" onClick={() => handleListClick(productObj.id)}>
                Remove
              </button>

            </div>
          </div>

        </Card.Body>

      </Card>

    </div>
  );
};

FavoritesProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FavoritesProductCard;
