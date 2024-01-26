import React, { useState } from 'react';
import onboardingAPI from '../../../../api_layer/apis/playerAPIs/onboardingAPI';
import './playerInduction.css';

function PlayerInduction({ onPlanetCreation }) {
    const [playerName, setPlayerName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playerName) {
            alert('Please enter a player name.');
            return;
        }

        try {
            // Call backend API to create the initial planet with the player name
            await onboardingAPI.createPlayer(playerName);
            onPlanetCreation(); // Trigger the initiation of planet creation
            
        } catch (error) {
            console.error('Error creating initial planet:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <div className="player-name-initiation">
            <h2>Start Your Journey</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="playerName">Enter your player name:</label>
                <input
                    type="text"
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button type="submit">Begin The Adventure</button>
            </form>
        </div>
    );
}

export default PlayerInduction;
