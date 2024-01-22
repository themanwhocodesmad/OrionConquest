import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import ScrollerComponent from '../components/welcome/scroller-component.js';
import PlayerNameInitiation from '../components/welcome/playername-initiation.js';

function Welcome() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [initiatePlayerName, setInitiatePlayerName] = useState(false);

    useEffect(() => {
        if (user && user.hasPlanet) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleStartClick = () => {
        setInitiatePlayerName(true);
    };

    return (
        <div>
            <h1>Welcome, {user ? user.displayName : 'Guest'}</h1>
            {!initiatePlayerName ? (
                <ScrollerComponent onStartClick={handleStartClick} />
            ) : (
                <PlayerNameInitiation />
            )}
        </div>
    );
}

export default Welcome;
