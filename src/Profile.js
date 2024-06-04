import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const containerStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '500px',
    height: '500px',
    backgroundColor: '#f7f7f7',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    margin: 'auto', 
    marginTop: '80px', 
    marginBottom: '80px'

  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '20px',
    marginLeft: 'auto', 
    marginRight: 'auto',
  };
 

  const userInfoStyle = {
    textAlign: 'center',
  };

  const { user } = useAuth0();
  console.log(user);

  return (
      <div style={containerStyle}>
        <img src={user?.picture} alt="Profile" style={imageStyle} />
        <div style={userInfoStyle}>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>

  );
};

export default Profile;
