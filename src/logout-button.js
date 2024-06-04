
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const logoutStyle = {
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
      style={logoutStyle}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
