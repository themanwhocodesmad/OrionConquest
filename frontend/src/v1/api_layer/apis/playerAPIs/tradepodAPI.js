import httpClient from "../../client";

const tradepodtAPI = {
uploadResources: async (fleetId, resourcesData) => {
    try {
      const response = await httpClient.post(`/tradepod/upload/${fleetId}`, { resourcesData });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  offloadResources: async (fleetId, targetPlanetId) => {
    try {
      const response = await httpClient.post(`/tradepod/offload/${fleetId}`, { targetPlanetId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  offloadResourcesOnAllFleets: async (targetPlanetId) => {
    try {
      const response = await httpClient.post(`/tradepod/offload-all`, { targetPlanetId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadResourcesOnAllFleets: async (resourcesData) => {
    try {
      const response = await httpClient.post(`/tradepod/upload-all`, { resourcesData });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default tradepodAPI