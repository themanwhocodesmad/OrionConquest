const Armoury = require("../../models/game-models/armoury-models/armoury-model");
const { Fleet } = require("../../models/game-models/armoury-models/fleet-schema");

const calculateBattleOutcome = async (attackerFleetId, defenderArmouryId) => {
    const attackerFleet = await Fleet.findById(attackerFleetId).populate('troops.troopType');
    const defenderArmoury = await Armoury.findById(defenderArmouryId).populate('fleets').populate('troops.troopType');

    // Calculate total attack HP of attacker and total defense HP of defender
    let totalAttackHp = calculateTotalAttackHp(attackerFleet);
    let totalDefenseHp = calculateTotalDefenseHp(defenderArmoury);

    if (totalAttackHp > totalDefenseHp) {
    // Attacker wins
    handleAttackerVictory(attackerFleet, defenderArmoury, totalAttackHp, totalDefenseHp);
    } else {
    // Defender wins, attacker loses the fleet
    handleDefenderVictory(attackerFleet, defenderArmoury);
    }
};

module.exports = calculateBattleOutcome
