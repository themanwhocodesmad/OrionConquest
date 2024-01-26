import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../business_layer/context/AuthContext'
import OpeningScrollerComponent from '../../components/page-components/welcome/OpeningScroll.js';
import PlayerInduction from '../../components/page-components/welcome/PlayerInduction.js';
import PlanetCreation from '../../components/page-components/welcome/PlanetCreation.js';

function Welcome() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [initiatePlayerName, setInitiatePlayerName] = useState(false);
    const [initiatePlanetCreation, setInitiatePlanetCreation] = useState(false);

    useEffect(() => {
        if (user && user.hasPlanet) {
            navigate('/home');
        }
    }, [user, navigate]);

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
