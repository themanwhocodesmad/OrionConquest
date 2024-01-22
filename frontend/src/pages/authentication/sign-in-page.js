import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './sign-in-page.css';
import gameLogo from '../../../src/assets/images/logo.svg'; 

function SignIn() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/welcome');
        }
    }, [isAuthenticated, navigate]);

    const handleGoogleSignIn = () => {
        window.location.href = `http://localhost:8000/auth/google`; // Or use API_BASE_URL
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
