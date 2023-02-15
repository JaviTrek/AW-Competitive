import React, {useEffect, useState} from "react";
import awLogo from "../../images/awLogo.webp"
import '../../App.sass'
import axios from "axios";
import {logPlugin} from "@babel/preset-env/lib/debug";
import mapData from "./causticFinale.json"


export function MapGrid() {

    let [map, setMap] = useState('map')
    useEffect( () => {

        console.log(mapData)
        setMap(

            <div className={`gridSize${mapData.mapColumns}`}>
                    <div>hello 1</div>
                <div>hello 1</div>
                <div>hello 1</div><div>hello 1</div>



            </div>
        )

        } , [])




    return(

        <div>
            {map}
        </div>
    )

}