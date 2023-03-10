import React, {useEffect, useState} from "react";

import {pathFinding} from "./gameLogic/pathfinding"
import {moveUnit} from "./gameLogic/moveUnit"
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
                    //Ignore last one since that one has mapInformation and is not a mapTile

                    //TODO: Find a way to add a key value to unit and check if its true
                    if (index !== res.data.length - 1) {
                        mapTiles.push(
                            <div onClick={() => {
                                checkPath(index)
                            }} key={index} className={`mapTile`} id={(index)}>
                                <div className={tile.terrainImage}></div>


                                <div className={tile.hasUnit.name}></div>
                                <div className="tileCursor"></div>
                            </div>
                        )
                    }
                })
                setMap(mapTiles)
            }).catch(e => {
            console.log(e)
        });
    }, [])

    function checkPath(index) {
        resetGrid()
        let newMap = mapTiles
        //lets check if there is a unit before even calculating paths
       if(mapTiles[index].props.children[1].props.className !== undefined
           && mapTiles[index].props.children[1].props.className !== "undefined") {

           // lets call our function that can calculate the possible tiles we can take
           let findPath = pathFinding(18, 18, mapData[index], mapTiles[index].props.id, mapData, mapTiles)



           // lets use the return value from our pathFinding function (findPath), which is an array with the index of the tiles that we can move to
           findPath.tilesToDraw.forEach((tile) => {
               mapTiles[tile.index] = <div key={tile.index} onClick={() => {newPosition(findPath, tile.index)}} className={`mapTile`} id={tile.index}>
                   <div className={mapData[tile.index].terrainImage}>
                       {tile.index}
                   </div>
                   <div className={mapData[tile.index].hasUnit.name}></div>
                   <div className="tileMove"></div>
                   <div className="tileCursor"></div>
               </div>
           })
           //TODO: Can we take out this little .slice() trick and make react just re-render normally?

           // react needs to be tricked in order to re-render for some reason?
           newMap = mapTiles.slice()

       }
        setMap(newMap)


    }

    //used to calculate the new position of the unit
    function newPosition(movementArray, targetTile) {

        //lets see what the shortest path is
        let findPath = moveUnit(movementArray, targetTile);

        //lets reverse it so we don't start at the end
        let path = findPath.reverse()

        //where we start
        let initialTile = path[0];
        //where we end
        let lastTile = path[path.length - 1];
        resetGrid()
        //now we need to slowly move this unit to its new tile
        // TODO: these movements should go from path[0] (initial tile) to path[path.length -1] (lastTile) by moving a tile at a time instead of jumping from start to end (so 0,1,2,3...) because the unit moves through the terrain, it doesnt just teleport to its target location.
        setTimeout(()=> {
            mapTiles[initialTile] = <div key={initialTile} onClick={() => {
                checkPath(initialTile)
            }} className={`mapTile`} id={initialTile}>
                <div  className={mapData[initialTile].terrainImage}></div>
                <div className={"undefined"}></div>
                <div className="tileCursor"></div>
            </div>


            mapTiles[lastTile] = <div key={lastTile} onClick={() => {
                checkPath(lastTile)
            }} className={`mapTile`} id={lastTile}>
                <div  className={mapData[lastTile].terrainImage}></div>
                <div className={mapData[initialTile].hasUnit.name}></div>
                <div className="tileCursor"></div>
            </div>
            setMap(mapTiles)
        },0)



    }


    //function used to resetGrid to original state
    function resetGrid() {
        // lets reset the map, to make sure we don't grab any other MoveTile divs with us
        mapTiles.forEach((tile, index) => {
            mapTiles[index] = <div key={index} onClick={() => {
                checkPath(index)
            }} className={`mapTile`} id={index}>
                <div  className={tile.props.children[0].props.className}></div>
                <div className={tile.props.children[1].props.className}></div>
                <div className="tileCursor"></div>
            </div>
        })
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

