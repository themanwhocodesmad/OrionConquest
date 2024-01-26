import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../business_layer/context/AuthContext';
import './signIn.css';
import gameLogo from '../../assets/gameLogo.png';

function SignIn() {
  const { isAuthenticated, signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (!window.location.pathname.startsWith('/welcome')) {
        // Navigate to the welcome page for users without planets
        navigate('/welcome');
      } else if (!window.location.pathname.startsWith('/home')) {
        // Navigate to the home page for users with planets
        navigate('/home');
      }
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = () => {
    signIn(); // Use signIn method from AuthContext
  };

  return (
    <div className="container">
      <img src={gameLogo} alt="Game Logo" className="logo" />
      <button onClick={handleGoogleSignIn} className="gsi-material-button">
        <span className="gsi-material-button-content-wrapper">
          <span className="gsi-material-button-contents">
            Continue with Google
          </span>
        </span>
      </button>
    </div>
  );
}

export default SignIn;
