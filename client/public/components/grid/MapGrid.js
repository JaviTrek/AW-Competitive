import React, {useEffect, useState} from "react";
import awLogo from "../../images/awLogo.webp"
import '../../App.sass'
import axios from "axios";
import {logPlugin} from "@babel/preset-env/lib/debug";


export function MapGrid() {


    let [map, setMap] = useState([])
    useEffect(() => {
        axios.get('/map/randomMap')
            .then(res => {

                let mapTiles = []
                console.log(res.data.map[0])
                res.data.map.forEach((tile, index) => {

                    mapTiles.push(
    <div key={index} className={`${tile[1].slice(0,2)} mapTile`}>
    </div>

                    )

                })
                console.log(mapTiles)
                setMap(mapTiles)

            }).catch(e => {
            console.log(e)
        });
    }, [])




    return (

        <div>
            <div className={`gridSize18 mapGrid` }>
                {map}
            </div>
        </div>
    )

}