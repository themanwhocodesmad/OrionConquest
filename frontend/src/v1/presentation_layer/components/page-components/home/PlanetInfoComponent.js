import React from 'react';
import './styling.css';

const PlanetInfoComponent = ({ planetData }) => {
  // Check if planetData is available
  if (!planetData || !planetData.player || !planetData.planet) {
    return <div className="planet-info">Loading...</div>;
  }

  return (
    <div className="planet-info">
      <p>
        {planetData.player.playerName} | OC: {planetData.player.orionCredits}
      </p>

      <p>
        {planetData.planet.name} | Pop: {planetData.planet.population}
      </p>
    </div>
  );
};

export default PlanetInfoComponent;
