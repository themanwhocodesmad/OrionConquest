const HamburgerMenu = ({ onClick, collapsed }) => {
    return (
      <div className={`hamburger-menu ${collapsed ? 'collapsed' : ''}`} onClick={onClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    );
  };
  
  export default HamburgerMenu;
  