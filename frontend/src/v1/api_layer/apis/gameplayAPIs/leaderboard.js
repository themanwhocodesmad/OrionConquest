import httpClient from "../../client";

const leaderboardAPI = {

    getPlayerLeaderboard: async () => {
        try {
          const response = await httpClient.get('/leaderboard/players');
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    
    
      getAllianceLeaderboard: async () => {
        try {
          const response = await httpClient.get('/leaderboard/alliances');
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    
}

export default leaderboardAPI