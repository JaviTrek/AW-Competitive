import React, {useEffect, useState} from "react";

import {pathFinding} from "./gameLogic/pathfinding"


import '../../App.sass'
import axios from "axios";


export function ParsedMap() {

// this function will request our server for a json file, read it and create tiles depending on the json file information
    let mapTiles = []
    let mapData = []
    let [map, setMap] = useState([])
    useEffect(() => {
        axios.get('/map/parsedMap')
            .then(res => {

                mapData = res.data
                res.data.forEach((tile, index) => {
                    //Ignore first one since that one has mapInformation and is not a mapTile
                    if(index !== 0) {
                        mapTiles.push(
                            <div key={index} className={`mapTile`} id={index}>
                                <div  className={tile.image}>
                                </div>
                                <div  className="tileCursor"></div>
                            </div>
                        )
                    }
                })



            }).then(() => {
            let newMap = pathFinding(18, 18, 3, {x: 8, y: 9}, mapData, mapTiles)
            setMap(newMap)

        }).catch(e => {
            console.log(e)
        });

    }, [])






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