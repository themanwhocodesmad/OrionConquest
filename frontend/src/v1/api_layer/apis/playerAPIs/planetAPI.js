import httpClient from "../../client";

const planetAPI = {
  getPlayerPlanetData: async (planetId) => {
    try {
      const response = await httpClient.get(`/api/planet/${planetId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getAllPlanets: async () => {
    try {
      const response = await httpClient.get('/api/planet/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  destroyPlanet: async (planetId) => {
    try {
      const response = await httpClient.delete(`/api/planet/${planetId}/destroy`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default planetAPI;
