import httpClient from "../../client";

const mapAPI = {

  createRaidingList: async (listName) => {
    try {
      const response = await httpClient.post('/raiding-lists', { name: listName });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add endpoint to add a planetId to the main raiding list
  addToRaidingList: async (planetId) => {
    try {
      const response = await httpClient.post(`/raiding-lists/`, { planetId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add endpoint to add a planetId to a specific raiding list
  addToSpecificRaidingList: async (listId, planetId) => {
    try {
      const response = await httpClient.post(`/raiding-lists/${listId}`, { planetId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default mapAPI;
