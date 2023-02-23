import React, {useEffect, useState} from "react";

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
                        <div key={index} className={`mapTile c${tile[0]} r${tile[1]}`}>
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


    // Determine our tiles
    const startCoordinates = [7, 10]
    const movement = 6

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
            // we havent seen previous yet
            previous.push(null);
            // we still dont have the movement cost of each tile
            movementCost.push(null);
        }

        let startTile = start[0] + start[1] * maxX
        console.log(startTile)
    }

    possibleMovement(18, 18, 6, [1, 3])

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