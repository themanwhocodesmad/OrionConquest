import React from 'react';
// If using npm/yarn method, import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonComponent = ({ text, onClick, icon }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />} {/* Display the icon */}
      {text}
    </button>
  );
};

export default ButtonComponent;
