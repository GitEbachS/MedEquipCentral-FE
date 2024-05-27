import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';

const OrderCard = ({ orderObj }) => (
  <Card key={orderObj.id} className="card-style" style={{ width: '38rem' }}>
    <Card.Body>
      <div key={orderObj?.user.id} className="user-container">
        <Image src={orderObj?.user.image} className="userImageReview" alt="User profile" />
        <p>{orderObj?.user.name}</p>
      </div>
      <h3>Order #{orderObj.id}</h3>
      <p>Total Products: {orderObj.totalProducts}</p>
      <p>Total Price: ${orderObj.total.toFixed(2)}</p>
      <p>Status: {orderObj.isClosed ? 'Closed' : 'Open'}</p>
      {/* <div className="order-details">
        <p>Credit Card Number: {orderObj.creditCardNumber || 'N/A'}</p>
        <p>Expiration Date: {orderObj.expirationDate || 'N/A'}</p>
        <p>CVV: {orderObj.cvv || 'N/A'}</p>
        <p>Zip: {orderObj.zip || 'N/A'}</p>
      </div> */}
      <Link href={`/order/${orderObj.id}`} passHref>
        <div>
          <Button id="vieworder" className="viewBtn m-2">VIEW</Button>
        </div>
      </Link>
      <div>
        <Button id="reOrder" className="viewBtn m-2">ReOrder</Button>
      </div>
    </Card.Body>
  </Card>

);

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    totalProducts: PropTypes.number,
    total: PropTypes.number,
    userId: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
    isClosed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OrderCard;
