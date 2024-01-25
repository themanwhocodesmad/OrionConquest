import httpClient from "../../client";

const armouryAPI = {
  launchAttack: async (fleetId, targetPlanetId) => {
    try {
      const response = await httpClient.post('/armoury/launch-attack', { fleetId, targetPlanetId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelAttack: async (attackId) => {
    try {
      const response = await httpClient.post(`/armoury/cancel-attack/${attackId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createFleet: async (fleetData) => {
    try {
      const response = await httpClient.post('/armoury/create-fleet', fleetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  destroyFleet: async (fleetId) => {
    try {
      const response = await httpClient.post(`/armoury/destroy-fleet/${fleetId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateFleet: async (fleetId, updatedFleetData) => {
    try {
      const response = await httpClient.post(`/armoury/update-fleet/${fleetId}`, updatedFleetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  moveFleet: async (fleetId, destinationPlanetId) => {
    try {
      const response = await httpClient.post('/armoury/move-fleet', { fleetId, destinationPlanetId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  recallFleet: async (fleetId) => {
    try {
      const response = await httpClient.post(`/armoury/recall-fleet/${fleetId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelMove: async (moveId) => {
    try {
      const response = await httpClient.post(`/armoury/cancel-move/${moveId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  scanPlanetWithFleet: async (fleetId, planetId) => {
    try {
      const response = await httpClient.post(`/armoury/scan/${fleetId}`, planetId);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  colonizePlanet: async (fleetId, galaxyNumber, planetNumber) => {
    try {
      const response = await httpClient.post('/armoury/create', {
        fleetId,
        galaxyNumber,
        planetNumber,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};

export default armouryAPI;
