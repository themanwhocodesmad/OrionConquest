require('mongoose')
const Planet = require('../../../../models/game-models/building-models/planets-model')
const Player = require('../../../../models/accounts-models/player-model')
const {Store} = require('../../../../models/game-models/general-building-models/stores-model')
const SolarArray = require('../../../../models/game-models/general-building-models/solar-array-model')

const planetController = {
  
  getPlayerPlanetData: async (req, res) => {
    try {
      // Assuming the user's ID is available in req.userId
      const playerId = await Player.findOne({ user: req.userId });
  
      // Assuming the planetId is available in req.params.planetId
      const planetId = req.params.planetId;
  
      // Get Planet information (planet.name, planet.population)
      const planet = await Planet.findOne({ _id: planetId, player: playerId });
      
      if (!planet) {
        return res.status(404).json({ error: 'Planet not found' });
      }
  
  
      // Get Player information (player.orionCredits, player.playerName)
      const player = await Player.findOne({ _id: playerId });
  
      // Get Stores information from stores belong to planetId (store.storage)
      const stores = await Store.find({ planet: planetId });
  
      // Get SolarArray information
      const solarArray = await SolarArray.findOne({ planet: planetId });
  
      // Construct planetData object with various info
      const combinedData = {
        planetData: {
          planet: {
            name: planet.name,
            population: planet.population,
          },
          player: {
            orionCredits: player.orionCredits,
            playerName: player.playerName,
          },
        },
  
        // Construct storesAndEnergy object with stores and energy information
        storesAndEnergy: {
          stores: stores.map((store) => ({
            storage: store.storage,
            name: store.storeType,
          })),
          energy: {
            storage: solarArray ? solarArray.generated_resources : 0,
            name: 'Energy',
          },
        },
      };
  
      res.status(200).json(combinedData);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

  getAllPlanets: async (req, res) => {
    try {
      // Assuming the user's ID is available in req.userId
      const playerId = await Player.findOne({ user: req.userId });

      // Get Planets belonging to the player
      const planets = await Planet.find({ player: playerId }).sort({ createdAt: 1 });

      // Extract relevant information (name, coordinates, id) from each planet
      const formattedPlanets = planets.map((planet) => ({
        name: planet.name,
        coordinates: planet.coordinates,
        id: planet._id,
      }));

      res.status(200).json(formattedPlanets); 
    } catch (error) {
      console.error('Error fetching all planets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  destroyPlanet: async (req, res) => {
    const { planetId } = req.params;

    try {
      // Assuming you have a function to handle planet destruction in the model
      await Planet.destroyPlanet(planetId);
      res.status(200).json({ message: 'Planet destroyed successfully' });
    } catch (error) {
      console.error('Error destroying planet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = planetController;
