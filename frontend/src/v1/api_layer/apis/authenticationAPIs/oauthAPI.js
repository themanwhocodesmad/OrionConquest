import httpClient from "../../client";


const oauthAPI = {
  googleSignIn: async () => {
    try {

      console.log(process.env.REACT_APP_API_BASE_URL);
      // Redirect the user to the Google authentication URL
      window.location.href = `http://localhost:8000/auth/google`;
    } catch (error) {
      throw error;
    }
  },
  logout: async (updateAuthContext) => {
    try {
      const response = await httpClient.post('/auth/logout');
      updateAuthContext({ isAuthenticated: false, user: null, hasPlanets: false });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default oauthAPI;