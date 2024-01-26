import React from 'react';
import ButtonComponent from '../../ui/ButtonComponent';
import { useNavigate } from 'react-router-dom';

import { faBuilding, faAtom, faShoppingCart, faVials } from '@fortawesome/free-solid-svg-icons';

const FacilitiesButtonComponent = ({ planetId }) => {
  const navigate = useNavigate();
  const facilities = [
    { name: 'Resource Management', icon: faVials },
    { name: 'Research Development', icon: faAtom },
    { name: 'Buildings', icon: faBuilding },
    { name: 'Market', icon: faShoppingCart }
  ];

  const handleNavigate = (facility) => {
    navigate(`/home/${planetId}/${facility.name}`);
  };

  return (
    <div>
      <hr />
      <h2 className='underlined-text'>Facilities:</h2>
      <div className="facilities-buttons">
        {facilities.map((facility, index) => (
          <ButtonComponent 
            key={index} 
            text={facility.name} 
            icon={facility.icon}
            onClick={() => handleNavigate(facility)} 
          />
        ))}
      </div>
    </div>
  );
};

export default FacilitiesButtonComponent;
