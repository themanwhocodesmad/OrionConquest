import httpClient from "../../client";

const planetAPI = {
  getPlayerPlanetData: async () => {
    try {
      const response = await httpClient.get('/planet/player');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllPlanets: async () => {
    try {
      const response = await httpClient.get('/planet/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  destroyPlanet: async (planetId) => {
    try {
      const response = await httpClient.delete(`/planet/${planetId}/destroy`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default planetApiService;
