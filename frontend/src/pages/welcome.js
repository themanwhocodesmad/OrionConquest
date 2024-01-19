import React, { useState, useEffect } from 'react';
import { getUserPlanets } from '../network-services/api-service';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [planets, setPlanets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserPlanets()
      .then(setPlanets)
      .catch(error => console.error('Error fetching planets:', error));
  }, []);

  const handleStartAdventure = () => {
    navigate('/planet/initial');
  };

  return (
    <div>
      <h1>Welcome to the Space Themed Strategy Game</h1>
      <ul>
        {planets.map(planet => (
          <li key={planet._id}>{planet.name}</li>
        ))}
      </ul>
      <button onClick={handleStartAdventure}>Start the Adventure</button>
    </div>
  );
}

export default Welcome;
