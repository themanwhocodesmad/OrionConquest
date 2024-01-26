import React, { createContext, useContext, useState, useEffect } from 'react';
import { planetRepository } from '../repositories/planetRepository'; // Adjust the path as needed

const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [currentPlanetId, setPlanetId] = useState(null);

  useEffect(() => {
    const fetchInitialPlanet = async () => {
      try {
        const planets = await planetRepository.getPlanets();
        if (planets.length > 0) {
          setPlanetId(planets[0].id); // Set the first planet's ID as the default
        }
      } catch (error) {
        console.error('Error fetching initial planet:', error);
      }
    };

    fetchInitialPlanet();
  }, []);

  return (
    <PlanetContext.Provider value={{ currentPlanetId, setPlanetId }}>
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanetContext = () => {
  const context = useContext(PlanetContext);

  if (!context) {
    throw new Error('usePlanetContext must be used within a PlanetProvider');
  }

  return context;
};
