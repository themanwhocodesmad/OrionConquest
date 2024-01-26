import planetAPI from "../../api_layer/apis/playerAPIs/planetAPI";

class PlanetRepository {
  constructor() {
    this.planetData = null;
  }

  async getPlanets() {
    if (!this.planetData) {
      this.planetData = await planetAPI.getAllPlanets();
    }
    return this.planetData;
  }

  async refreshPlanets() {
    this.planetData = await planetAPI.getAllPlanets();
    return this.planetData;
  }
}

export const planetRepository = new PlanetRepository();
