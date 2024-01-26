import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { usePlanetContext } from '../../../business_layer/context/PlanetContext';
import planetAPI from '../../../api_layer/apis/playerAPIs/planetAPI';
import HamburgerMenu from '../ui/HamburgerMenu';
import PillSwitch from '../ui/PillSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGlobe } from '@fortawesome/free-solid-svg-icons'; 


const Sidebar = () => {
  const { currentPlanetId, setPlanetId } = usePlanetContext();
  const [planets, setPlanets] = useState([]);
  const [displayMode, setDisplayMode] = useState('name'); // Default display mode is 'name'
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const planetsData = await planetAPI.getAllPlanets();
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

  return (
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader>
        <HamburgerMenu onClick={toggleSidebar} collapsed={collapsed} />
        {/* ... other header content */}
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
            {!collapsed && <Link to="/home">Home</Link>}
            {collapsed && <Link to="/home" title="Home" />} {/* Show only icon when collapsed */}
          </MenuItem>
          <SubMenu title={!collapsed && "Planets"} icon={<FontAwesomeIcon icon={faGlobe} />}>
  <MenuItem>
    <PillSwitch 
      isOn={displayMode === 'name'} 
      handleToggle={toggleDisplayMode} 
    />
  </MenuItem>
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
          {/* ... other menu items */}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        {/* Footer content */}
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
