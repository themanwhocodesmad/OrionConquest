import httpClient from './http-client';

export const checkUserAuthentication = async () => {
    try {
      const response = await httpClient.get('/auth/check-authentication');
      return response.data;
    } catch (error) {
      console.error('Error checking user authentication:', error);
      throw error;
    }
  };

  

export const getUserPlanets = async () => {
  try {
    const response = await httpClient.get('/user/planets');
    return response.data;
  } catch (error) {
    console.error('Error fetching user planets:', error);
    throw error;
  }
};

export const getUserBuildings = async (planetId) => {
  try {
    const response = await httpClient.get(`/user/buildings`, {
      params: { planetId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user buildings:', error);
    throw error;
  }
};

