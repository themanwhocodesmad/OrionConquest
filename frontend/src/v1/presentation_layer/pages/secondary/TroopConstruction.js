import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import armouryAPI from '../../../api_layer/apis/playerAPIs/armouryAPI' // Adjust path as needed

const TroopConstruction = () => {
  const { troopId, troopName } = useParams();
  const [quantity, setQuantity] = useState(0);

  const handleConstruct = async () => {
    try {
      await armouryAPI.constructTroops(troopId, quantity);
      console.log(`Constructed ${quantity} of ${troopName}`);
      // Add logic for successful construction (e.g., navigate back or show success message)
    } catch (error) {
      console.error('Error constructing troops:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Construct {troopName}</h2>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        placeholder="Enter quantity" 
      />
      <button onClick={handleConstruct}>Construct</button>
    </div>
  );
};

export default TroopConstruction;
