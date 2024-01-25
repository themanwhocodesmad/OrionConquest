import httpClient from "../../client";

const gameplayAPI = {

  scoutPlanet: async (planetId) => {
    try {
      const response = await httpClient.post(`/espionage/scout-planet/${planetId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllianceBasicInfo: async (allainceId) => {
    try {
      const response = await httpClient.get(`/espionage/alliances/basic/${allainceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPlayerBasicInfo: async (playerId) => {
    try {
      const response = await httpClient.get(`/espionage/players/basic/${playerId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

}

export default gameplayAPI;
