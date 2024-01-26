const Armoury = require('../../../../models/game-models/armoury-models/armoury-model'); // Import the Armoury model

// Controller function to get troops in the armoury by planetId
exports.getTroopDetails = async (req, res) => {
  try {
    const { planetId } = req.params;

    // Find the armoury document for the given planetId
    const armoury = await Armoury.findOne({ planet: planetId }).populate('troops.troopType');

    if (!armoury) {
      return res.status(404).json({ message: 'Armoury not found for the specified planetId' });
    }

    // Extract the troops information
    const troops = armoury.troops.map((troop) => ({
      id: troop.troopType,
      name: troop.troopName, 
      quantity: troop.quantity,
    }));

    res.status(200).json({ troops });
  } catch (error) {
    console.error('Error fetching armoury:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
