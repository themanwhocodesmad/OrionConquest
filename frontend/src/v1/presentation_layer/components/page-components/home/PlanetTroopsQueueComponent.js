import React from 'react';

const PlanetTroopQueueComponent = ({ troopQueue }) => {
  return (
    <div>
      <h2>Troop Queue</h2>
      {troopQueue.map((troop, index) => (
        <div key={index}>
          <p>Troop Name: {troop.troopName}</p>
          <p>Total Duration: {troop.totalDuration}</p>
          <p>Quantity: {troop.quantity}</p>
          <p>Next Complete Time: {troop.nextCompleteTime}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanetTroopQueueComponent;
