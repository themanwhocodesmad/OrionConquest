import httpClient from "../../client";

const troopsAPI = {
  queueTroops: async (troopId, quantity) => {
    try {
      const response = await httpClient.post(`/api/armoury/${troopId}`, {quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllTroopsForPlanet: async (planetId) => {
    try {
      // Ensure the endpoint matches the one defined in your backend routes
      const response = await httpClient.get(`/api/armoury/troops/${planetId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default troopsAPI;
