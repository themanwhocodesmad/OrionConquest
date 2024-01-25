// buildingsAPI.js
import httpClient from "../../client";

const buildingsAPI = {
  upgradeBuilding: async (buildingId) => {
    try {
      const response = await httpClient.post(`/buildings/upgrade/${buildingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelBuildingUpgrade: async (buildingId, targetLevel) => {
    try {
      const response = await httpClient.post(`/buildings/cancel/${buildingId}`, { targetLevel });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  destroyBuilding: async (buildingId, targetLevel) => {
    try {
      const response = await httpClient.post(`/buildings/destroy/${buildingId}`, { targetLevel });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  upgradeResearchFacility: async (buildingId) => {
    try {
      const response = await httpClient.post(`/research/upgrade/${buildingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelResearchFacilityUpgrade: async (buildingId, targetLevel) => {
    try {
      const response = await httpClient.post(`/research/cancel/${buildingId}`, { targetLevel });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deactivateMine: async (mineId) => {
    try {
      const response = await httpClient.post(`/mines/deactivate/${mineId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  reactivateMine: async (mineId) => {
    try {
      const response = await httpClient.post(`/mines/reactivate/${mineId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default buildingsAPI;
