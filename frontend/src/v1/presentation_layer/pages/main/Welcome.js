import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../business_layer/context/AuthContext';
import { usePlanetContext } from '../../../business_layer/context/PlanetContext';
import OpeningScrollerComponent from '../../components/page-components/welcome/OpeningScroll.js';
import PlayerInduction from '../../components/page-components/welcome/PlayerInduction.js';
import PlanetCreation from '../../components/page-components/welcome/PlanetCreation.js';

function Welcome() {
    const { isAuthenticated, user } = useContext(AuthContext);
    const { currentPlanetId } = usePlanetContext();
    const navigate = useNavigate();
    const [initiatePlayerName, setInitiatePlayerName] = useState(false);
    const [initiatePlanetCreation, setInitiatePlanetCreation] = useState(false);

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated && user?.hasPlanets && currentPlanetId) {
            // Redirect to home with the current planet ID if the user is authenticated and has planets
            navigate(`/home/${currentPlanetId}`);
        } else if (isAuthenticated && !user?.hasPlanets) {
            // Stay on the welcome page if the user is authenticated but doesn't have planets
            // Further actions like planet creation can be handled here
        } else {
            // Redirect to a sign-in page if the user is not authenticated
            navigate('/');
        }
    }, [isAuthenticated, user, currentPlanetId, navigate]);

    const handleStartClick = () => {
        setInitiatePlayerName(true);
    };

    const handlePlanetCreation = () => {
        setInitiatePlanetCreation(true);
    };

    return (
        <div>
            <h1>Welcome, {user ? user.displayName : 'Guest'}</h1>
            {!initiatePlayerName && !initiatePlanetCreation ? (
                <OpeningScrollerComponent onStartClick={handleStartClick} />
            ) : !initiatePlanetCreation ? (
                <PlayerInduction onPlanetCreation={handlePlanetCreation} />
            ) : (
                <PlanetCreation navigate={navigate} />
            )}
        </div>
    );
}

export default Welcome;
