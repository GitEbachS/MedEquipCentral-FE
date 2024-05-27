import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import updateUser from '../../api/userData';
import { registerUser } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';
import getJobFunctions from '../../api/jobFunctionData';

const intitialState = {
  firstName: '',
  lastName: '',
  image: '',
  email: '',
  address: '',
  jobFunctionId: -1,
  isBizOwner: false,
};

const UserForm = ({ userObj, onUpdate }) => {
  const router = useRouter();
  const { user } = useAuth();
  const isEditing = !!userObj.id; // Check if user has an id to determine if it's an update
  const [userData, setUserData] = useState(intitialState);
  const [jobFunctions, setJobFunctions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj.id) {
      updateUser(userObj.id, userData).then(() => router.push('/'));
    } else {
      registerUser({ ...userData, uid: user.uid })?.then(onUpdate);
    }
  };
  useEffect(() => {
    if (userObj.id) setUserData(userObj);
    getJobFunctions().then(setJobFunctions);
  }, [userObj]);

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="firstName">User Profile:</label>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Add your first name..."
          type="text"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Add your last name..."
          value={userData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="image"
          placeholder="Add your profile pic..."
          value={userData.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="email"
          placeholder="Add your email..."
          value={userData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="address"
          placeholder="Add your address..."
          value={userData.address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          aria-label="Job Function"
          name="jobFunctionId"
          onChange={handleChange}
          className="mb-3"
          value={userData.jobFunctionId}
          required
        >
          <option value="">Select a Job Function</option>
          {jobFunctions.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isBizOwner"
        name="isBizOwner"
        label="Business Owner"
        aria-label="Business Owner"
        checked={userData.isBizOwner}
        onChange={(e) => {
          setUserData((prevState) => ({
            ...prevState,
            isBizOwner: e.target.checked,
          }));
        }}

      />

      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </Form>
  );
};

UserForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    jobFunctionId: PropTypes.number,
    isBizOwner: PropTypes.bool,
  }),
  onUpdate: PropTypes.func.isRequired,
};
UserForm.defaultProps = {
  userObj: intitialState,
};
export default UserForm;
