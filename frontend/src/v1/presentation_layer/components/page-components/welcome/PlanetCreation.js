import React from 'react';
import { usePlanetContext } from '../../../../business_layer/context/PlanetContext'; 
import onboardingAPI from '../../../../api_layer/apis/playerAPIs/onboardingAPI';
import { planetRepository } from '../../../../business_layer/repositories/planetRepository'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const PlanetCreation = () => {
  const { setPlanetId } = usePlanetContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Call backend API to create the planet
      await onboardingAPI.initialPlanet();

      // Fetch the list of planets to get the first planet's ID
      const planets = await planetRepository.getPlanets();
      if (planets.length > 0) {
        const firstPlanetId = planets[0].id;

        // Update the context with the new planetId
        setPlanetId(firstPlanetId);

        // Navigate to the specific home page for the new planet
        navigate(`/home/${firstPlanetId}`);
      } else {
        // Handle the case where no planets are returned
        console.error('No planets found');
      }
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
