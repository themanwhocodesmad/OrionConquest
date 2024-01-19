const Planet = require('../../../models/game-models/building-models/planets-model');
const Building = require('../../../models/game-models/building-models/buildings-abstract-model');

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

module.exports = {
  getUserPlanets,
  getUserBuildings,
};
