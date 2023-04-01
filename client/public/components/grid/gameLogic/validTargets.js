import {unitType} from "./unitType";


//This function is used to find all valid targets for an unit after they move to a selected tile, its what it allow us to check whether they can shoot or not
function findTargets(newTile, unit, gameState) {
    const getUnitRanges = unitType(1, true)
    const unitRange = getUnitRanges[unit.id].range
    let r1 = unitRange[0]
    let r2 = unitRange[1]
    let indexTargets = []
    const y = Math.trunc(newTile/ 18)
    const x = (newTile) % 18
    const xMove = [-r1, r1, 0, 0];
    const yMove = [0, 0, -r1, r1];

    do {
        for (let i = 0; i < 4; i++) {
            let addX = x + xMove[i]
            let addY = y + yMove[i]
            if (addY < 0 || addX < 0 || addX >= 18 || addY >= 18) continue;
            const adjacentTile = addX + addY * 18
            indexTargets.push(adjacentTile)
        }
        r1++
    } while (r1 -1  < unitRange[1] )


    let canTarget = []
    indexTargets.forEach((tile, index) => {
        if (gameState[tile].tileUnit && gameState[tile]?.tileUnit.country !== unit.country) canTarget.push(tile)
    })

    return canTarget




}

export {findTargets}