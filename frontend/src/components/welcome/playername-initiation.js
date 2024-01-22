import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../old/business_logic_layer/context/auth-context';
import { createInitialPlanet } from '../../network-services/api-service';
import './playername-initiation.css';

function PlayerNameInitiation() {
    const [playerName, setPlayerName] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playerName) {
            alert('Please enter a player name.');
            return;
        }
    
        try {
            // Call backend API to create the initial planet with the player name
            await createInitialPlanet({ playerName });
            console.log('Creating initial planet for', playerName);

            navigate('/home'); // Navigate to /home-page
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

export default PlayerNameInitiation;
