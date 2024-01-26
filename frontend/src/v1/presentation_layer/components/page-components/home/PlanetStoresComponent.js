import React from 'react';

const PlanetStoresComponent = ({ stores, energy }) => {
  const getColorClass = (index) => {
    const colors = ['blue', 'green', 'red', 'dark-yellow'];
    return colors[index % colors.length];
  };

  return (
    <div className="stores-container">
      {stores && stores.map((store, index) => (
        <div key={index} className={`store-item ${getColorClass(index)}`}>
          {store.name ? store.name[0] : 'N/A'}: {store.storage !== undefined ? store.storage : 'N/A'}
        </div>
      ))}
      {energy && (
        <div className={`store-item ${getColorClass(stores.length)}`}>
          {energy.name ? energy.name[0] : 'N/A'}: {energy.storage !== undefined ? energy.storage : 'N/A'}
        </div>
      )}
    </div>
  );
};

export default PlanetStoresComponent;
