import React from 'react';

const PlanetBuildingQueueComponent = ({ buildingQueue }) => {
  return (
    <div>
      <h2>Building Queue</h2>
      {buildingQueue.map((building, index) => (
        <div key={index}>
          <p>Building Name: {building.buildingName}</p>
          <p>Time To Completion: {building.timeToCompletion}</p>
          <p>Next Building: {building.nextBuilding}</p>
          <p>Queue Quantity: {building.queueQuantity}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanetBuildingQueueComponent;
