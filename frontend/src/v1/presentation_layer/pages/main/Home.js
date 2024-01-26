import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlanetInfoComponent from '../../components/page-components/home/PlanetInfoComponent';
import PlanetStoresComponent from '../../components/page-components/home/PlanetStoresComponent';
import { usePlanetContext } from '../../../business_layer/context/PlanetContext';
import planetAPI from '../../../api_layer/apis/playerAPIs/planetAPI';
import FacilitiesButtonComponent from '../../components/page-components/home/FacilitiesButtonComponent';
import StructuresButtonComponent from '../../components/page-components/home/StructuresButtonComponent';

const Home = () => {
  const [planetData, setPlanetData] = useState({});
  const { planetId } = useParams();
  const { currentPlanetId, setPlanetId } = usePlanetContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await planetAPI.getPlayerPlanetData(planetId);
        console.log(response);
        setPlanetData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching planet data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [planetId]);
  

  useEffect(() => {
    if (planetId && planetId !== currentPlanetId) {
      setPlanetId(planetId);
    }
  }, [planetId, currentPlanetId, setPlanetId]);

  
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <PlanetInfoComponent planetData={planetData.planetData} />
          <PlanetStoresComponent 
            stores={planetData.storesAndEnergy?.stores} 
            energy={planetData.storesAndEnergy?.energy} 
          />
          <FacilitiesButtonComponent planetId={planetId} />
          <StructuresButtonComponent planetId={planetId}/>
          {/* Other components */}
        </>
      )}
    </div>
  );
};


export default Home;
