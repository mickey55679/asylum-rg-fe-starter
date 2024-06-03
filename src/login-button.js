import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0(); //destructure loginWithRedirect from auth0
  return (
    <button
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
