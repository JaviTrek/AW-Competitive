import {unitType} from "./unitType";
import {pathFinding} from "./pathfinding";


//This function is used to find all valid targets for an unit after they move to a selected tile, its what it allow us to check whether they can shoot or not
function findTargets(newTile, unit, gameState) {
    let indexTargets = []
    const y = Math.trunc(newTile/ 18)
    const x = (newTile) % 18
    const xMove = [-1, 1, 0, 0];
    const yMove = [0, 0, -1, 1];

 if (unit.id === 4) {
        //its an arty, lets use infantry movement and delete the initial tile plus every 1 movement tile
        let targets = pathFinding(18, 18, 0, newTile, gameState, true)
        for (let i = 0; i < 5; i++) {
            targets.tilesToDraw.shift()
        }
    targets.tilesToDraw.forEach(tile => {
        indexTargets.push(tile.index)
    })

    } else if(unit.id === 8 || unit.id === 7) {
        //its a rocket/missile, lets use an arty movement and delete the initial tile plus every 2 movement tile
        let targets = pathFinding(18, 18, 4, newTile, gameState, true)
        for (let i = 0; i < 9; i++) {
            targets.tilesToDraw.shift()
        }
        targets.tilesToDraw.forEach(tile => {
            indexTargets.push(tile.index)
        })
    } else {
        //not an arty or missile
        for (let i = 0; i < 4; i++) {
            let addX = x + xMove[i]
            let addY = y + yMove[i]
            if (addY < 0 || addX < 0 || addX >= 18 || addY >= 18) continue;
            const adjacentTile = addX + addY * 18
            indexTargets.push(adjacentTile)
        }
    }

    let canTarget = []
    indexTargets.forEach((tile, index) => {
        if (gameState[tile].tileUnit && gameState[tile]?.tileUnit.country !== unit.country) canTarget.push(tile)
    })

    return canTarget




}

export {findTargets}