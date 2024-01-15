
const scheduleAttack = (attackerFleetId, defenderArmouryId) => {
    const attackStartTime = new Date();
    const attackDuration = 60000; // 1 minute in milliseconds

    // Schedule the battle calculation after 1 minute
    setTimeout(() => {
        calculateBattleOutcome(attackerFleetId, defenderArmouryId);
    }, attackDuration);

    return attackStartTime;
};


module.exports = scheduleAttack