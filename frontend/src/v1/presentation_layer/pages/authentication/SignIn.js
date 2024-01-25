import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../business_layer/context/AuthContext'
import oauthAPI from '../../../api_layer/apis/authenticationAPIs/oauthAPI';
import './signIn.css'
import gameLogo from '../../assets/gameLogo.png'; 

function SignIn() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        if (isAuthenticated) {
            // If authenticated, redirect to the welcome page
            navigate('/welcome');
        }
    }, [isAuthenticated, navigate]);

    const handleGoogleSignIn = async () => {
        try {
            // Call the googleSignIn method from the oauthAPI service
            await oauthAPI.googleSignIn();

            // Optionally, you can also check the authentication status after signing in
            if (isAuthenticated) {
                // If authenticated, redirect to the welcome page
                navigate('/welcome');
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
            // Handle error as needed
        }
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
