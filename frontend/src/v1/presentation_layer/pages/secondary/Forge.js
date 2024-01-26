import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanetContext } from '../../../business_layer/context/PlanetContext'; // Adjust path as needed
import { troopRepository } from '../../../business_layer/repositories/troopRepository'; // Adjust path as needed
import ButtonComponent from '../../components/ui/ButtonComponent';

const Forge = () => {
  const { currentPlanetId } = usePlanetContext();
  const [troops, setTroops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTroops = async () => {
      console.log(currentPlanetId)
      if (currentPlanetId) {
        const fetchedTroops = await troopRepository.getTroops(currentPlanetId);
        setTroops(fetchedTroops);
      }
    };

    fetchTroops();
  }, [currentPlanetId]);

  const navigateToTroopConstruction = (troopId, troopName) => {
    navigate(`/forge/${troopId}/${troopName}`);
  };

  return (
    <div>
      <h2>Forge</h2>
      <div className="troops-container">
        {troops.map((troop) => (
          <ButtonComponent 
            key={troop.id}
            text={`Create ${troop.name}`}
            onClick={() => navigateToTroopConstruction(troop.id, troop.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Forge;
