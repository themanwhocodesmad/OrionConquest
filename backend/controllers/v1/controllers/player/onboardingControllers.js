const User = require('../../../../models/accounts-models/user-model');
const Player = require('../../../../models/accounts-models/player-model');
const Planet =require('../../../../models/game-models/building-models/planets-model')
const initializePlanet = require('../../../../helpers/create-buildings-for-planet')
const {generateInitialPlanetRandomName} = require('../../../../helpers/initial-naming-functions')

const onboardingController = {
  createPlayer: async (req, res) => {
    try {
      const user = req.user;

      // Check if the user already has a player
      if (user.player) {
        return res.status(400).json({ error: 'User already has a player' });
      }

      // Create a new player
      const newPlayer = new Player({
        user: user._id,
        playerName: req.body.playerName,
      });

      // Save the new player to the database
      await newPlayer.save();

      // Update the user with the player reference
      user.player = newPlayer._id;
      await user.save();

      return res.status(201).json({ message: 'Player created successfully', player: newPlayer });
    } catch (error) {
      console.error('Error creating player:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createInitialPlanet: async (req, res) => {

    try {
      let success = false;
      let attemptCount = 0;
      let newPlanet;
  
      // Limit the number of attempts to avoid infinite loops
      while (!success && attemptCount < 5) {
        // Find the maximum galaxy number in the map
        const lastPlanet = await Planet.findOne().sort({ galaxy: -1 });
        let newGalaxyNumber = lastPlanet ? lastPlanet.galaxy + 1 : 1;
  
        newPlanet = new Planet({
          galaxy: newGalaxyNumber,
          planetNumber: 1,
          name: generateInitialPlanetRandomName(),
          occupied: true,
        });
  
        newPlanet.generateCoordinates();
  
        try {
          await newPlanet.save();
          success = true; // Planet saved successfully, exit the loop
        } catch (error) {
          if (error.code === 11000) {
            // Duplicate key error
            attemptCount++;
            console.log(`Duplicate key error. Attempt ${attemptCount}`);
            // Log the error and retry with a new galaxy number
          } else {
            // If the error is not related to duplicate keys, throw it
            console.error('Error saving new planet:', error);
            throw error;
          }
        }
      }
  
      if (success) {
        try {
          // Get the current user's player and associate the new planet with that player
          const currentPlayer = await Player.findOne({ user: req.userId });
          newPlanet.player = currentPlayer._id;
          await newPlanet.save();
  
          // Update hasPlanets to true in User model
          await User.findOneAndUpdate({ _id: req.userId }, { hasPlanets: true });
  
          await initializePlanet(newPlanet._id);
          console.log('New planet and its buildings created successfully');
          res.status(201).json({
            message: 'New planet and its buildings created successfully',
            planet: newPlanet,
          });
        } catch (buildingError) {
          // Handle building creation error
          console.error('Error creating buildings:', buildingError);
          res.status(500).json({
            message: 'New planet and its buildings created successfully',
            planetId: newPlanet._id, // Send the planetId specifically
      });
        }
      } else {
        console.error('Failed to create a new planet after multiple attempts');
        res.status(500).json({
          message: 'Failed to create a new planet after multiple attempts',
        });
      }
    } catch (error) {
      console.error('Error creating new planet:', error);
      res.status(500).json({
        message: 'Error creating new planet',
        error: error.message,
      });
    }
  },
  
  };
  
  module.exports = onboardingController;
