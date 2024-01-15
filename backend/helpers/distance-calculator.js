function calculateDistanceWithDynamicWormhole(planet1, planet2) {
    
    const currentTime = new Date()

    const galaxyDistance = Math.abs(planet1.galaxy - planet2.galaxy);
    const planetNumberDistance = Math.abs(planet1.planetNumber - planet2.planetNumber);
    
    // Apply the dynamic wormhole factor to the galaxy distance
    const adjustedGalaxyDistance = galaxyDistance > 0 ? galaxyDistance * wormholeFactor(currentTime) : 0;

    return Math.sqrt(adjustedGalaxyDistance ** 2 + planetNumberDistance ** 2);
}

function wormholeFactor(currentTime) {

    
    /**
     * Generates a wormhole factor that fluctuates based on the time of day.
     * @param {Date} currentTime - The current time.
     * @returns {Number} The wormhole factor, fluctuating between 0.5 and 1.25.
     */

    // Convert the current time to an angle in radians (0 to 2π) representing a 24-hour period
    const hours = currentTime.getHours() + currentTime.getMinutes() / 60;
    const angle = (hours / 24) * 2 * Math.PI;

    // Generate a noisy trigonometric value fluctuating between -1 and 1
    const trigValue = Math.sin(angle) + Math.cos(2 * angle) * 0.5;

    // Scale and shift the output to be between 0.5 and 1.25
    const scaledValue = 0.375 * trigValue + 0.875;

    return Math.max(0.5, Math.min(scaledValue, 1.25));
}

const currentTime = new Date()
