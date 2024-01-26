// PlanetContext.js
import React, { createContext, useContext, useState } from 'react';

const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [currentPlanetId, setPlanetId] = useState(null);

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
