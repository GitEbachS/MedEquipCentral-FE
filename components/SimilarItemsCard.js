import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const SimilarItemsCard = ({ productObj }) => (
  <div>
    <Card className="card-style" style={{ height: '250px' }}>
      <Card.Body>
        <Link href={`/product/similar/${productObj.id}`} passHref>
          <Image src={productObj.image} alt={productObj.name} style={{ height: '100px' }} />
        </Link>

        <div className="product-details">
          <h2>{productObj.name}</h2>
          <p>Category: {productObj.category?.name}</p>
        </div>

      </Card.Body>

    </Card>

  </div>
);

SimilarItemsCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default SimilarItemsCard;
