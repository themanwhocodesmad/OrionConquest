import React from 'react';
import ButtonComponent from '../../ui/ButtonComponent';
import { useNavigate } from 'react-router-dom';
// Import FontAwesome icons
import { faHammer, faShieldAlt, faSatellite, faMeteor, faHandshake, faJetFighterUp } from '@fortawesome/free-solid-svg-icons';

const StructuresButtonComponent = ({ planetId }) => {
  const navigate = useNavigate();
  const structures = [
    { name: 'Forge', icon: faHammer },
    { name: 'Armoury', icon: faJetFighterUp },
    { name: 'Radar', icon: faSatellite },
    { name: 'Shield', icon: faShieldAlt },
    { name: 'Tradepod', icon: faHandshake },
    { name: 'Comm Station', icon: faMeteor }
  ];

  const handleNavigate = (structure) => {
    navigate(`/${structure.name}`);
  };

  return (
    <div>
      <hr />
      <h2 className='underlined-text'>Structures:</h2>
      <div className="facilities-buttons">
        {structures.map((structure, index) => (
          <ButtonComponent 
            key={index} 
            text={structure.name} 
            icon={structure.icon}
            onClick={() => handleNavigate(structure)} 
          />
        ))}
      </div>
    </div>
  );
};

export default StructuresButtonComponent;
