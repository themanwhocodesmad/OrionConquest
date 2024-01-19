import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { checkUserAuthentication } from '../../network-services/api-service';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };    

    useEffect(() => {
        checkUserAuthentication()
            .then(data => {
                if (data.isAuthenticated) {
                    login(); // Update context state
                    navigate('/welcome'); // Navigate to welcome page
                }
            })
            .catch(error => console.error('Authentication check failed:', error));
    }, [login, navigate]);

    return (
        <div>
            <h1>Welcome to [Your Game Name]</h1>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default SignIn;
