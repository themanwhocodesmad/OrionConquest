import httpClient from "../client";

const oauthService = {
    googleSignIn: async () => {
      try {
        const response = await httpClient.get('/auth/google');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    // Add more API service functions as needed
  };
  
  export default oauthService;