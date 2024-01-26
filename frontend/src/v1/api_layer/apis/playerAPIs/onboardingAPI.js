import httpClient from "../../client";

const onboardingAPI = {
  createPlayer: async (playerName) => {
    try {
      const response = await httpClient.post('api/onboarding/create', { playerName });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  initialPlanet: async () => {
    try {
      const response = await httpClient.post('api/onboarding/initial');
      return response.data;
    } catch (error) {
      throw error;
    }
}
}

export default onboardingAPI;
