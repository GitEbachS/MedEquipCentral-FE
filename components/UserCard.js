import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const UserCard = ({ userobj }) => (
  <div className="user-card">
    <Image src={userobj.image} alt={`${userobj.firstName} ${userobj.lastName}`} className="user-card-image" />
    <div className="user-card-details">
      <h2>{userobj.firstName} {userobj.lastName}</h2>
      <p>Email: {userobj.email}</p>
      <p>Address: {userobj.address}</p>
      <p>Job Function: {userobj.jobFunction.name}</p>
      {userobj.isBizOwner && <p>Business Owner</p>}
      {userobj.isAdmin && <p>Admin</p>}
    </div>
  </div>
);

UserCard.propTypes = {
  userobj: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string,
    jobFunction: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    isBizOwner: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

export default UserCard;
