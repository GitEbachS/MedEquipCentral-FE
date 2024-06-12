import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
        backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-hexagonal-background_23-2148939501.jpg?w=1060&t=st=1718217137~exp=1718217737~hmac=3adf73fca00c9ac3aa4725ac12196cc260aedd577a9061c520b1e1c45259184d)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.8', // Set your desired opacity here
      }}
    >
      <div className="signInContainer">
        <h1>MedEquipCentral</h1>
        <p>Click the button below to login!</p>
        <button type="button" className="checkout-button" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;
