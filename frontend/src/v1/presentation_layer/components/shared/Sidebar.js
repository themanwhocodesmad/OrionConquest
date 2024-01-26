import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { usePlanetContext } from '../../../business_layer/context/PlanetContext';
import { AuthContext } from '../../../business_layer/context/AuthContext'; 
import { planetRepository} from '../../../business_layer/repositories/planetRepository';
import HamburgerMenu from '../ui/HamburgerMenu';
import PillSwitch from '../ui/PillSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGlobe, faSignOutAlt, faComments, faCog, faQuestionCircle, faStore  } from '@fortawesome/free-solid-svg-icons'; 

const Sidebar = () => {
  const { currentPlanetId, setPlanetId } = usePlanetContext();
  const [planets, setPlanets] = useState([]);
  const [displayMode, setDisplayMode] = useState('name');
  const [collapsed, setCollapsed] = useState(false);
  const [openPlanetsSubMenu, setOpenPlanetsSubMenu] = useState(false); // Track submenu state

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const planetsData = await planetRepository.getPlanets();
        setPlanets(planetsData);
        if (planetsData.length > 0 && !currentPlanetId) {
          setPlanetId(planetsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [currentPlanetId, setPlanetId]);

  const toggleDisplayMode = () => {
    setDisplayMode((prevMode) => (prevMode === 'name' ? 'coordinates' : 'name'));
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle the sidebar state
  };

  const handlePlanetsClick = () => {
    setOpenPlanetsSubMenu(!openPlanetsSubMenu); // Toggle submenu state
  };


  const { signOut } = useContext(AuthContext); // Access signOut from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    await signOut(); // Call the signOut method from AuthContext
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="sidebar-container">
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader>
        <HamburgerMenu onClick={toggleSidebar} collapsed={collapsed} />

      </SidebarHeader>
      <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
              {!collapsed && <Link to={currentPlanetId ? `/home/${currentPlanetId}` : "/home"}>Home</Link>}
              {collapsed && <Link to={currentPlanetId ? `/home/${currentPlanetId}` : "/home"} title="Home" />} 
            </MenuItem>
            <SubMenu
              title={!collapsed && "Planets"}
              icon={<FontAwesomeIcon icon={faGlobe} />}
              onClick={handlePlanetsClick} // Toggle submenu when clicked
              open={openPlanetsSubMenu} // Control submenu open state
            >
              {!collapsed && (
                <MenuItem>
                  <PillSwitch 
                    isOn={displayMode === 'name'} 
                    handleToggle={toggleDisplayMode} 
                  />
                </MenuItem>
              )}
              {planets.map((planet) => (
                <MenuItem key={planet.id}>
                  {!collapsed && (
                    <Link
                      to={`/home/${planet.id}`}
                      onClick={() => setPlanetId(planet.id)}
                      className={planet.id === currentPlanetId ? 'active' : ''}
                    >
                      {displayMode === 'name' ? planet.name : planet.coordinates}
                    </Link>
                  )}
                  {collapsed && (
                    <Link
                      to={`/home/${planet.id}`}
                      onClick={() => setPlanetId(planet.id)}
                      title={displayMode === 'name' ? planet.name : planet.coordinates}
                    />  
                  )}
                </MenuItem>
              ))}
            </SubMenu>
          <MenuItem icon={<FontAwesomeIcon icon={faComments} />}> {/* Chat menu item */}
            <Link to="/chat">Chat</Link>
          </MenuItem>
          
          <MenuItem icon={<FontAwesomeIcon icon={faQuestionCircle} />}> {/* FAQ menu item */}
            <Link to="/faq">FAQ</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faStore} />}> {/* Store menu item */}
            <Link to="/store">Store</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faCog} />}> {/* Settings menu item */}
            <Link to="/settings">Settings</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faSignOutAlt} />} onClick={handleLogout}>
            Logout
          </MenuItem>
          {/* ... other menu items */}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        {/* Footer content */}
      </SidebarFooter>
    </ProSidebar>
    </div>
  );
};

export default Sidebar;
