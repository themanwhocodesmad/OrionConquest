const { MINES_PRODUCTION_RATE_TIME_MULTIPLIER } = require("../../constants/mines-enum");
const { Mine } = require("../../models/mines-model");
const Planet = require("../../models/planets-model");
const { Store } = require("../../models/stores-model")

async function productionRateStoreFiller() {
    try {
        // Fetch all mines
        const mines = await Mine.find({});

        for (const mine of mines) {
            // Fetch the planet for the current mine
            const planet = await Planet.findById(mine.planet);
            if (!planet) {
                console.log(`Planet not found for mine: ${mine._id}`);
                continue; // Skip to the next mine if the planet is not found
            }

            // Fetch all stores associated with this planet
            const stores = await Store.find({ planet: planet._id });

            // Find the specific store that matches the mine type
            const store = stores.find(s => s.storeType === mine.mineType);

            if (store) {
                store.storage += MINES_PRODUCTION_RATE_TIME_MULTIPLIER*mine.productionRate;
                await store.save(); // Save the updated store storage
            }
        }
    } catch (error) {
        console.error('Error in productionRateStoreFiller:', error);
    }
}


module.exports = {productionRateStoreFiller}