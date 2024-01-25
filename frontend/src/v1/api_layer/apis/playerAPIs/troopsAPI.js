import httpClient from "../../client";

const troopsAPI = {
  queueTroops: async (troopId, quantity) => {
    try {
      const response = await httpClient.post(`/troops/construct/ ${troopId}`, {quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default troopsAPI;
