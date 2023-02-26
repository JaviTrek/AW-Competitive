import React, {useEffect, useState} from "react";
import TinyQueue from "tinyqueue";
// Lets keep these imports here just in case for now

import '../../App.sass'
import axios from "axios";


export function ParsedMap() {

// this function will request our server for a json file, read it and create tiles depending on the json file information
    let [map, setMap] = useState([])
    useEffect(() => {
        axios.get('/map/parsedMap')
            .then(res => {
                let mapTiles = []

                res.data.forEach((tile, index) => {

                    mapTiles.push(
                        <div key={index} className={`mapTile`} id={`c${tile[0]}r${tile[1]}`}>
                            <div className={`${tile[2].slice(0, 3)} `}>
                            </div>
                            <div className="tileCursor"></div>
                        </div>
                    )
                })
                setMap(mapTiles)

            }).catch(e => {
            console.log(e)
        });
    }, [])


    function possibleMovement(maxX, maxY, movement, start) {


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
        // where our unit currently is, where it starts
        let startTile = start.x + start.y * maxX
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
            x: start.x,
            y: start.y
        }

        queue.push(initial)
        let tilesToDraw = [initial]

        verifyTile[startTile] = 0
        console.log(queue.length)

        while (queue.length != 0) {
            let current = queue.pop();
            let index = current.index;
            let minValue = current.distance;
            let x = current.x;
            let y = current.y;

            // we check that we have visited the current Node
            visitedNodes[index] = true


            //Not sure why we delete the verify tile?
            delete verifyTile[index]
            if (distance[index] < minValue) continue;


            //These are our x / y values, since if we go up, down, right or left we might add a column (1,1 to 2,1) or take one out (2,1 to 1,1) while or row might stay the same because we can only move one tile at the same time and therefore the row/column will increas eor decrease and the other one will stay the same.
            const xMove = [-1, 1, 0, 0];
            const yMove = [0, 0, -1, 1];

            for (let i = 0; i < 4; i++) {
                // we initialize our adding variables
                let addX = x + xMove[i]
                let addY = y + yMove[i]
                //For now lets say the terrain always has a cost of 1 movement.
                let terrainCost = 1
                if (addY < 0 || addX < 0 || addX >= maxX || addY >= maxY) continue;

                //The next tile is either -1 or +1 on row or column, so either addX or AddY will be 0, 1 or -1, moving us exactly one tile.
                let nextNodeIndex = addX + addY * maxX


                movementCost[nextNodeIndex] = terrainCost

                //Not sure what is the meaning of this?
                if (visitedNodes[nextNodeIndex]) continue;

                //The new distance from our initial tile to the new tile
                let newDistance = minValue + terrainCost
                if (newDistance < distance[nextNodeIndex] && newDistance <= movement) {
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
                            index: nextNodeIndex,
                            x: addX,
                            y: addY
                        });
                    }
                    else {
                            for (let node in queue) {
                                if (queue[node.index == nextNodeIndex])
                                    queue[node].distance = newDistance;
                            }
                        }

                }

            }
        }

        console.log(tilesToDraw)
        tilesToDraw.forEach(tile => {
            //grab x y, find those tiles/divs in our new grid and add those colors!
            // querySelector c${x}r${y}
            // add class to it

        })
    }

    possibleMovement(18, 18, 6, {
        x: 9, y: 9
    })

    return (

        <div>

            <div className="gameBox">
                <h1>Caustic Finale</h1>

                <div className={`gridSize18 mapGrid`}>
                    {map}

                </div>
            </div>
        </div>
    )

}