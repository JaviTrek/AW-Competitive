import React, {useEffect, useState} from "react";

// Lets keep these imports here just in case for now

import '../../style/App.sass'
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
                        <div key={index} className={`mapTile ${tile[0]}`}>
                            <div className={`${tile[1].slice(0, 3)} `}>
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