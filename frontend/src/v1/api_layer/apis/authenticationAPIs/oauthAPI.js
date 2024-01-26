import httpClient from "../../client";


const oauthAPI = {
  googleSignIn: async () => {
    try {
      window.location.href = `http://localhost:8000/auth/google`;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await httpClient.get('/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const response = await httpClient.get('/auth/check-auth');
      return response.data;
      
    } catch (error) {
      throw error;
    }
  },
};

export default oauthAPI;