// oauthAPI.js
import httpClient from "../../client";
import { AuthContext } from '../../../business_layer/context/AuthContext';

const oauthAPI = {
  googleSignIn: async () => {
    try {
      const response = await httpClient.get('/auth/google');
      const userData = response.data;

      AuthContext.updateAuthContext({
        isAuthenticated: userData.isAuthenticated,
        user: userData.user,
        hasPlanets: userData.hasPlanets,
      });

      return userData;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await httpClient.post('/auth/logout');
      
      // Assuming you have a function updateAuthContext to update AuthContext
      AuthContext.updateAuthContext({ isAuthenticated: false, user: null, hasPlanets: false });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Additional endpoints
  getUserInfo: async () => {
    try {
      const response = await httpClient.get('/auth/check-auth');
      const userData = response.data;

      // Assuming you have a function updateAuthContext to update AuthContext
      AuthContext.updateAuthContext({
        isAuthenticated: userData.isAuthenticated,
        user: userData.user,
        hasPlanets: userData.hasPlanets,
      });

      return userData;
    } catch (error) {
      // Handle the case when the user is not authenticated
      AuthContext.updateAuthContext({ isAuthenticated: false, user: null, hasPlanets: false });
      throw error;
    }
  },
};

export default oauthAPI;
