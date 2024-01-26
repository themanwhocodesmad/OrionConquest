import troopAPI from "../../api_layer/apis/playerAPIs/troopsAPI"; 

class TroopRepository {
  constructor() {
    this.troopData = null;
  }

  async getTroops(planetId) {
    if (!this.troopData) {
      this.troopData = await troopAPI.getAllTroopsForPlanet(planetId); // Ensure the function name matches
      console.log(this.troopData)
    }
    return this.troopData;
  }

  async refreshTroops(planetId) {
    this.troopData = await troopAPI.getTroopsForPlanet(planetId); // Adjust the API method as needed
    return this.troopData;
  }
}

export const troopRepository = new TroopRepository();
