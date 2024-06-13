import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const SimilarItemsCard = ({ productObj }) => (
  <Card className="cardStyle" style={{ height: '200px' }}>
    <Card.Body className="text-center">
      <Link href={`/product/similar/${productObj.id}`} passHref>
        <Image src={productObj.image} alt={productObj.name} className="cardImage" />
      </Link>
      <div className="product-details mt-2">
        <h4 className="productName">{productObj.name}</h4>
        <p className="productCategory">Category: {productObj.category?.name}</p>
      </div>
    </Card.Body>
  </Card>
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
