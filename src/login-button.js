import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0(); //destructure loginWithRedirect from auth0


    const loginStyle = {
      backgroundColor: 'var(--primary-color-coral)',
      color: 'var(--primary-color-white)',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-acumin-pro-regular)',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '5px',
    };
  return (
    <button
      style={loginStyle}
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
      varient="primary"
      className="btn-margin"
    >
      Log In
    </button>
  );
};
export default LoginButton;
