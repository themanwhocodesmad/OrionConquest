import React from 'react';
import onboardingAPI from '../../../../api_layer/apis/playerAPIs/onboardingAPI';

const PlanetCreation = ({ onSubmit, navigate }) => {
  const handleSubmit = async () => {
    try {
      // Call backend API to create the planet
      await onboardingAPI.initialPlanet();
      navigate('/home'); // Navigate to /home-page
    } catch (error) {
      console.error('Error creating planet:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="planet-creation">
      <h2>Create Your Planet</h2>
      <button onClick={handleSubmit}>Create Planet</button>
    </div>
  );
};

export default PlanetCreation;
