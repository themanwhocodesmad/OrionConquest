import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import LoadingComponent from '../loading/loading-component';


function AuthCallbackComponent() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const hasPlanet = queryParams.get('hasPlanet') === 'true';
        const userId = queryParams.get('userId'); // Assuming you're passing this from the backend
        const displayName = queryParams.get('displayName'); // Assuming you're passing this from the backend

        login({ userId, displayName, hasPlanet });
        navigate(hasPlanet ? '/home' : '/welcome');
    }, [login, navigate, location]);

    return (
        <LoadingComponent /> // Use the LoadingComponent here
    );
}

export default AuthCallbackComponent;
