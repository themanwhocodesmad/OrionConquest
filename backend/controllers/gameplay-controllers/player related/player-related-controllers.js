const Planet = require('../../../models/game-models/building-models/planets-model');
const Building = require('../../../models/game-models/building-models/buildings-abstract-model');
const Player = require('../../../models/accounts-models/player-model');
const User = require('../../../models/accounts-models/user-model');
const { generateInitialPlanetRandomName } = require('../../../helpers/initial-naming-functions');
const initializePlanet = require('../../../helpers/create-buildings-for-planet');
const mongoose = require('mongoose');
const { Store } = require('../../../models/game-models/general-building-models/stores-model');


const createUsersInitialPlanet = async (req, res) => {
  
  const { playerName} = req.body; // Ensure these are passed from the frontend

  // Get userId from the authenticated session
  const userId = req.user ? req.user.id : null;

  if (!playerName || !userId) {
      return res.status(400).json({ message: "Missing playerName or userId" });
  }


  try {
      // Check for unique player name
      const existingPlayer = await Player.findOne({ playerName });
      if (existingPlayer) {
          return res.status(400).json({ message: "Player name already exists" });
      }

    const newPlayer = new Player({
      user: userId,
      playerName: playerName,
      // Other player fields can be set here
  });

  await newPlayer.save();
   // Update user's player field with the new player's _id
  await User.findByIdAndUpdate(userId, { player: newPlayer._id }, { new: true });

  console.log("Updated user")


console.log("Now doing planet for PlayerId",newPlayer._id )

      // Proceed with planet creation
      let success = false;
      let attemptCount = 0;
      let newPlanet;

      while (!success && attemptCount < 5) {
          const lastPlanet = await Planet.findOne().sort({ galaxy: -1 });
          let newGalaxyNumber = lastPlanet ? lastPlanet.galaxy + 1 : 1;

          newPlanet = new Planet({
              galaxy: newGalaxyNumber,
              planetNumber: 1,
              name: generateInitialPlanetRandomName(),
              occupied: true,
              owner: newPlayer._id // Link the planet to the player
          });

          newPlanet.generateCoordinates();

          try {
              await newPlanet.save();
              success = true;
          } catch (error) {
              if (error.code === 11000) {
                  attemptCount++;
              } else {
                  throw error;
              }
          }
      }

      if (success) {
          try {
              await initializePlanet(newPlanet._id);
              res.status(201).json({ message: "New planet and its buildings created successfully", planet: newPlanet });
          } catch (buildingError) {
              res.status(500).json({ message: "Planet created, but error occurred while creating buildings", error: buildingError.message });
          }
      } else {
          res.status(500).json({ message: "Failed to create a new planet after multiple attempts" });
      }

  } catch (error) {
      res.status(500).json({ message: "Error in player creation or planet initialization", error: error.message });
  }
};



const getUserPlanets = async (req, res) => {
  try {
    const userId = req.user.id;
    const planets = await Planet.find({ owner: userId })
      .select('_id name coordinates')
      .sort({ createdAt: 'asc' });

    res.json(planets);
  } catch (error) {
    console.error('Error retrieving planets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserBuildings = async (req, res) => {
  try {
    let planetId = req.query.planetId;

    if (!planetId) {
      const oldestPlanet = await Planet.findOne().sort({ createdAt: 'asc' });
      planetId = oldestPlanet ? oldestPlanet._id : null;
    }

    if (!planetId) {
      return res.status(404).json({ error: 'No planets found.' });
    }

    const buildings = await Building.find({ planet: planetId });
    res.json(buildings);
  } catch (error) {
    console.error('Error retrieving buildings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getPlanetHomeInformation = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated.' });
    }

    const user = await User.findOne({ id: userId });
    let planetId;

    if (user && user.player) {
      const oldestPlanet = await Planet.findOne({ owner: user.player }).sort({ createdAt: 1 });
      planetId = oldestPlanet ? oldestPlanet._id : null;
    }

    if (!planetId) {
      return res.status(404).json({ error: 'No planets found for the player.' });
    }

    const planet = await Planet.findById(planetId);

    if (!planet) {
      return res.status(404).json({ error: 'Planet not found.' });
    }

    const stores = await Store.find({ planet: planetId });

    const playerData = {
      planetName: planet.name,
      planetCoordinates: planet.coordinates,
      orionCredits: user.player.orionCredits // Access orionCredits from user's player
    };

    res.json({ playerData, stores });
  } catch (error) {
    console.error('Error retrieving planet information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {
  getPlanetHomeInformation,
  getUserPlanets,
  getUserBuildings,
  createUsersInitialPlanet
};
