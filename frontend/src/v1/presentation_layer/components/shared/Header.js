import React from 'react';
import gameLogo from '../../assets/output-onlinepngtools.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={gameLogo} alt="Game Logo" className="logo" />
      </div>
      <div className="title-container">
        <h1>The Orion Conquest</h1>
      </div>
    </header>
  );
};

export default Header;
