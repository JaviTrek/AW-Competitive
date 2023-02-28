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
                    // we have -1 because we ignore the first element since its not a tile and we want our tile to have a key/id of 0 because its the first tile, not the second one.
                    if(index !== res.data.length - 1) {
                        mapTiles.push(
                            <div onClick={() => {checkPath(index)}} key={index} className={`mapTile`} id={(index)}>
                                <div  className={tile.image}>
                                </div>
                                <div  className="tileCursor"></div>
                            </div>

                        )
                    }
                })
                setMap(mapTiles)



            }).then(() => {



        }).catch(e => {
            console.log(e)
        });

    }, [])


    function checkPath(index) {
        let findPath = pathFinding(18, 18, mapData[index], mapTiles[index].props.id, mapData, mapTiles)
        setMap(findPath)
    }



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