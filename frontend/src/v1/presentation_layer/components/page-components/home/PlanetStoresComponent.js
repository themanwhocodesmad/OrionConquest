import React from 'react';

const PlanetStoresComponent = ({ stores, energy }) => {
  return (
    <div>
      <h2>Stores</h2>
      {stores && stores.map((store, index) => (
        <div key={index}>
          {store.name ? store.name[0] : 'N/A'}: {store.storage !== undefined ? store.storage : 'N/A'}
        </div>
      ))}
      {energy && (
        <div>
          {energy.name ? energy.name[0] : 'N/A'}: {energy.storage !== undefined ? energy.storage : 'N/A'}
        </div>
      )}
    </div>
  );
};

export default PlanetStoresComponent;
