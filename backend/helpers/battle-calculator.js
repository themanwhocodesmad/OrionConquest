const calculateTotalAttackHp = (fleet) => {
    let totalAttackHp = 0
    fleet.troops.forEach(troop => {
        totalAttackHp += troop.quantity * troop.troopType.attackHp
    })
    return totalAttackHp
}

const calculateTotalDefenseHp = (armoury) => {
    let totalDefenseHp = 0
    // Include both troops and fleets in the armoury
    armoury.troops.forEach(troop => {
        totalDefenseHp += troop.quantity * troop.troopType.defenseHp
    })
    armoury.fleets.forEach(fleet => {
        // Assume calculateTotalAttackHp can also be used to calculate defense HP for a fleet
        totalDefenseHp += calculateTotalAttackHp(fleet)
    })
    return totalDefenseHp
}

const handleAttackerVictory = (attackerFleet, defenderArmoury, totalAttackHp, totalDefenseHp) => {
    // Defender loses everything
    // Attacker loses a percentage of each troop in the fleet
    const lossPercentage = Math.pow(totalAttackHp / totalDefenseHp, 1.5) / 100
    attackerFleet.troops.forEach(troop => {
        troop.quantity -= Math.ceil(troop.quantity * lossPercentage)
    })
    // Update the attacker's fleet and the defender's armoury in the database
}

const handleDefenderVictory = (attackerFleet, defenderArmoury) => {V
    // Attacker loses the fleet
    // Update the attacker's fleet (as lost) and the defender's armoury in the database
}

module.exports = {calculateTotalAttackHp, calculateTotalDefenseHp
,handleAttackerVictory, handleDefenderVictory}
