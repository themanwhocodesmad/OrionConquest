import React from 'react';
import { Link } from 'react-router-dom';

const PlanetList = ({ planets, currentPlanetId, setPlanetId, displayMode }) => {
  return (
    <ul className="planet-list">
      {planets.map((planet) => (
        <li key={planet._id}>
          <Link
            to={`/home/${planet._id}`}
            onClick={() => setPlanetId(planet._id)}
            className={planet._id === currentPlanetId ? 'active' : ''}
          >
            {displayMode === 'name' ? planet.name : planet.coordinates}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PlanetList;
