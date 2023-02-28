import TinyQueue from "tinyqueue";
import React from "react";
import {unitType} from "./unitType";
import {checkTerrain} from "./checkTerrain";


function pathFinding(maxX, maxY, unit, startIndex, mapData, mapModify) {

    //Our function goes and check what ID is the unit we have
    const unitData = unitType(unit.hasUnit.id)
    const unitMove = unitData.move
    const unitMoveType = unitData.moveType


    const startY = Math.trunc(startIndex / 18)
    const startX = (startIndex) % 18

    //maxX maxY = rows columns, multiply together and get all tiles in grid
    const nodeAmount = maxX * maxY

    //lets create our grid!

    //So we need to initialize our visited nodes (which we will use to check if we have used or haven't used the route before)
    let visitedNodes = [];
    // Our presumed distance from start to the given tile
    let distance = [];

    //our previous tiles?
    let previous = [];

    // the cost of movement in this tile?
    let movementCost = [];

    //lets actually build the grid
    for (let i = 0; i < nodeAmount; i++) {
        // we havent visited it yet
        visitedNodes.push(false);
        //?
        distance.push(Infinity);
        // we havent seen previous yet, so they are all null
        previous.push(null);
        // we still dont have the movement cost of each tile
        movementCost.push(null);
    }
    // where our unit currentNodely is, where it starts
    let startTile = startX + startY * maxX
    // there is 0 distance to transverse the tile we are already in.
    distance[startTile] = 0

    let queue = new TinyQueue([], function (a, b) {
        return a.distance - b.distance;
    })


    // we verify tiles to not include them twice
    let verifyTile = {}


    // our initial tile
    let initial = {
        index: startTile,
        distance: 0,
        x: startX,
        y: startY
    }

    queue.push(initial)
    let tilesToDraw = [initial]

    verifyTile[startTile] = 0

    // here is the "real" djkstras algorithm
    while (queue.length !== 0) {

        // we get the node
        let currentNode = queue.pop();
        let index = currentNode.index;
        let minValue = currentNode.distance;
        let x = currentNode.x;
        let y = currentNode.y;

        // we check that we have visited the currentNode Node
        visitedNodes[index] = true


        //Not sure why we delete the verify tile?
        delete verifyTile[index]


        if (distance[index] < minValue) {
            console.log(`${distance[index]} is less than ${minValue} `)
            continue;
        }

        //These are our x / y values, since if we go up, down, right or left we might add a column (1,1 to 2,1) or take one out (2,1 to 1,1) while or row might stay the same because we can only move one tile at the same time and therefore the row/column will increas eor decrease and the other one will stay the same.
        const xMove = [-1, 1, 0, 0];
        const yMove = [0, 0, -1, 1];


        for (let i = 0; i < 4; i++) {
            // we initialize our adding variables
            let addX = x + xMove[i]
            let addY = y + yMove[i]




            // if we hit an edge, we stop (being -1 or being our max value +1, we enter a tile that doesnt exist (such as a 3x3 having a tile -1 or tile 4)
            if (addY < 0 || addX < 0 || addX >= maxX || addY >= maxY) continue;

            //The next tile is either -1 or +1 on row or column, so either addX or AddY will be 0, 1 or -1, moving us exactly one tile.
            let nextNodeIndex = addX + addY * maxX
            console.log(nextNodeIndex)
            //lets check the terrain cost of our next index
            //
            let terrainCost = checkTerrain(unitMoveType, mapData[nextNodeIndex])
            //If we have already visited this node, we go to the next ones
            if (visitedNodes[nextNodeIndex]) continue;


            movementCost[nextNodeIndex] = terrainCost

            //The new distance from our initial tile to the new tile
            let newDistance = minValue + terrainCost



            //if new distance is less than the distance of the next node
            // AND less than movement
            if (newDistance < distance[nextNodeIndex] && newDistance <= unitMove) {
                previous[nextNodeIndex] = index
                distance[nextNodeIndex] = newDistance
                // if we havent verified this tile
                if (!verifyTile[nextNodeIndex]) {
                    queue.push({
                        index: nextNodeIndex,
                        distance: newDistance,
                        x: addX,
                        y: addY
                    });
                    verifyTile[nextNodeIndex] = newDistance

                    tilesToDraw.push({
                        distance: newDistance,
                        index: nextNodeIndex,
                        x: addX,
                        y: addY
                    });
                } else {
                    for (let node in queue) {
                        if (queue[node.index === nextNodeIndex])
                            queue[node].distance = newDistance;
                    }
                }

            }

        }
    }

    console.log(tilesToDraw)
    tilesToDraw.forEach((tile, index) => {

        mapModify[tile.index] = <div key={tile.index} className={`mapTile`} id={tile.index}>
            <div className={mapData[tile.index].image}>
            </div>
            <div className="tileCursor"></div>
            <div className="moveTile"></div>

        </div>

    })




return mapModify
}


function findTerrain(mapData, unitID) {



}
export {pathFinding};