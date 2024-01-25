import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
};

export default Sidebar;
