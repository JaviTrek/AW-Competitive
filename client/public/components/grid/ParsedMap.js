import React, {useEffect, useState} from "react";

import {pathFinding} from "./gameLogic/pathfinding"
import {moveUnit} from "./gameLogic/moveUnit"
import {socketFunction} from "./gameLogic/websocket"
import '../../App.sass'
import axios from "axios";
import io from "socket.io-client"
import {unitType} from "./gameLogic/unitType";

const socket = io.connect("http://localhost:4000")

export function ParsedMap() {


// this function will request our server for a json file, read it and create tiles depending on the json file information
    let mapTiles = []
    let gameState = []
    let [map, setMap] = useState([])
    useEffect(() => {
        axios.get('/getGameState')
            .then(res => {
                gameState = res.data.gameState
                res.data.gameState.forEach((tile, index) => {
                    //TODO: Find a way to add a custom HTML attribute to element and check its value. (We might not need this thou, maybe we can just keep checking the element).
                    let hasUnit;


                    mapTiles.push(
                        <div onClick={() => {
                            checkActions(index)
                        }} key={index} className={`mapTile`}>
                            <div className={tile.terrainImage}></div>
                            <div
                                className={tile.hasUnit ? tile.hasUnit.country + tile.hasUnit.name : undefined}></div>

                            <div className="tileCursor"></div>
                        </div>
                    )
                })
                setMap(mapTiles)
            }).catch(e => {
            console.log(e)
        });
    }, [])

    //we listen for actions being sent
    socket.on("receiveAction", data => {



    })


    /*

    TODO:
        turns
        ownership
        status(free/used)
        check who owns the base/city
        display the countries units



    STANDARIZING ACTIONS

    0 - Reset board to current State
        Stop showing pathfinding or menus

    1 - Click an unit or building
        check gameState for hasUnit or hasProperty
        1.1 - If unit
            Show available pathfinding options


    2 - Show menu
        After clicking, a menu should render according to the unit
        BUT! Break / reset if user clicks on top of another unit
        2.1 - If Unit
            Show options
                Wait
                Do checks
                    Attack (if next to enemy)
                    Capture (if infantry && if on property)
        2.2 - If base
            Show available buying options and grey out unavailable ones

    3 - Confirm action
        Player must click on a menu option

        Check if its the turn of the current player
            If yes, continue, else dont do anything
        3.1 - If building
            Just click on action, spawn unit on frontend and send update to mongoDB
        3.2 - If Unit
            If wait: just re-render frontend and send data to mongo
            If attack: Run attack function and calculate damage, update 3 tiles (initial tile, new tile (with its unit), and enemy tile/unit )
     */

    //lets change a specific tile and its elements
    function changeTile(index, instructionObject ) {

        let instruction = {
            hasUnit: "undefined",
            tileMove: false,

        }
        mapTiles[index] = <div key={index} onClick={() => {
            checkPath(index)
        }} className={`mapTile`}>
            <div className={gameState[index].terrainImage}></div>
            <div className={instructionObject.hasUnit}></div>
            <div className="tileMove"></div>
            <div className="tileCursor"></div>
        </div>
    }

//function used to resetGrid to original state
    function resetGrid() {
        let resetMap = []
        // lets reset the map, to make sure we don't grab any other MoveTile divs with us
        gameState.forEach((tile, index) => {
            mapTiles[index] = <div onClick={() => {
                checkActions(index)
            }} key={index} className={`mapTile`}>
                <div className={tile.terrainImage}></div>
                <div
                    className={gameState[index].hasUnit ? gameState[index].hasUnit.country + gameState[index].hasUnit.name : "undefined"}></div>
                <div className="tileCursor"></div>
                <div className={"undefined"}></div>
            </div>
        })
        resetMap = mapTiles.slice()
        setMap(resetMap)
    }

    //Step 1

    function checkActions(index) {
        //TODO: Instead of calling gameState[initialTile] like 100 times, lets put that into a variable to make our code much more compact

        resetGrid()
        //Lets make sure to reset the grid
        if (gameState[index].hasUnit !== false) {
            //show pathfinding options
            checkPath(index)
        } else if (gameState[index].terrainType === "property") {
            showMenu(index, index, false)
            //move to building menu actions function

        }
    }

    //function used to render our blue squares and see what our available movements are
    function checkPath(initialTile) {
        let newMap;
        // lets call our function that can calculate the possible tiles we can take
        let blueTiles = pathFinding(18, 18, gameState[initialTile], initialTile, gameState, mapTiles)
        // lets use the return value from our pathFinding function (pathFinding), which is an array with the index of the tiles that we can move to
        blueTiles.tilesToDraw.forEach((tile) => {

            let hasUnit =  <div
                className={gameState[tile.index].hasUnit ? gameState[tile.index].hasUnit.country + gameState[tile.index].hasUnit.name : "undefined"}></div>
            mapTiles[tile.index] = <div key={tile.index} onClick={() => {
                newPosition(blueTiles,  tile.index, initialTile)
            }} className={`mapTile`}>
                <div className={gameState[tile.index].terrainImage}></div>
                {hasUnit}
                <div className="tileMove"></div>
                <div className="tileCursor"></div>
            </div>
        })
        // react needs to be tricked in order to re-render for some reason? Will not re-render mapTiles despite it being different
        //TODO: Can we take out this little .slice() trick and make react just re-render normally?
        newMap = mapTiles.slice()

        //lets re render our new map
        setMap(newMap)
    }

    //used to calculate the new position of the unit
    function newPosition(movementArray, targetTile, initialTile, ) {
        let shortestPath = moveUnit(movementArray, targetTile);
        //lets make sure user doesnt put unit on top of another unit (but if able to put the unit on the same spot as well)
        if (gameState[targetTile].hasUnit !== false && shortestPath.length !== 1) {
            checkPath(checkActions(targetTile))
        } else {
            //lets see what the shortest path is
            let shortestPath = moveUnit(movementArray, targetTile);
            let newTile;
            if (shortestPath.length <= 1) {
                newTile = shortestPath[0]
            } else newTile = shortestPath[shortestPath.length - 1];

            //if the unit moves to the same tile it was already in, we don't need to do anything
            if (newTile !== initialTile) {
                // TODO: these movements should go from path[0] (initial tile) to path[path.length -1] (newTile) by moving a tile at a time instead of jumping from start to end (so 0,1,2,3...) because the unit moves through the terrain, it doesnt just teleport to its target location.

                //lets delete/set the unit in the old tile as undefined
                mapTiles[initialTile] = <div key={initialTile} onClick={() => {
                    checkPath(initialTile)
                }} className={`mapTile`}>
                    <div className={gameState[initialTile].terrainImage}></div>
                    <div className={"undefined"}></div>
                    <div className="tileMove"></div>
                    <div className="tileCursor"></div>
                </div>

                //lets move our old tile unit to its new tile
                mapTiles[newTile] = <div key={newTile} onClick={() => {
                    checkPath(newTile)
                }} className={`mapTile`} id={newTile}>
                    <div className={gameState[newTile].terrainImage}></div>
                    <div className={gameState[initialTile].hasUnit.country + gameState[initialTile].hasUnit.name}></div>
                    <div className="tileMove"></div>
                    <div className="tileCursor"></div>
                </div>
            }
            showMenu(initialTile, newTile, true)
        }

    }

    //TODO: God has forsaken me in this crazy long function and at some point I need to start butchering up this whole thing into more digestible components/not have 400 lines worth of functions in the react file
    async function showMenu(initialTile, newTile, isUnit) {

        /*
        TODO:
            need to check if infantry
                need to check if tile[index] is property and if its not already from their team
                    show Capture Option
            need to check units in the four corners around it
                if unit && notSameTeam
                    show attack option
         */

        let tileMenu = [];
        let showBlueTile;
        //lets check if its a unit
        if (await isUnit !== false) {
            showBlueTile = <div className="tileMove"></div>
            tileMenu.push(<div className="menuName"
                               onClick={() => confirmAction(initialTile, newTile, moveAction(initialTile, newTile))}>Wait</div>)
            //if its an infantry and also on a property

            if ( gameState[initialTile].hasUnit.id === 0 || 1){

                if (gameState[newTile].terrainType === "property" && gameState[newTile].terrainOwner !== gameState[initialTile].hasUnit.country) {

                    tileMenu.push(<div className="menuName"
                                       onClick={() => confirmAction(initialTile, newTile, captureAction(initialTile, newTile))}>Capture</div>)
                }
            }

            tileMenu =
                <div className="tileMenu">
                    {tileMenu}
                </div>


            //lets cheeck if its a factory/base
        } else if (await gameState[initialTile].terrainImage.slice(2, 3) === "2") {

            //lets get the array with all the units
            const unitsToBuild = unitType(0, true)

            //lets stablish if we display orangeStar or blueMoon units
            const ownerShip = gameState[initialTile].terrainOwner

            //lets make an array with each unit, display its information and a function to confirm the actrion
            unitsToBuild.forEach((unit, id) => {
                tileMenu.push(
                    <div className="menuOptions"
                         onClick={() => confirmAction(initialTile, newTile, buildAction(initialTile,
                             {
                                 ownerShip: ownerShip,
                                 unit: unit,
                                 id: id
                             }
                         ))}>
                        <div className={`menu${ownerShip}${unit.menuName}`}></div>
                        <div className={`menuName`}> {unit.menuName}</div>
                        <div className={`menuCost`}> {unit.cost}</div>
                    </div>
                )
            })
            tileMenu = <div className="tileMenu">
                {tileMenu}
            </div>

        }
        mapTiles[newTile] = <div key={newTile} className={`mapTile`} id={newTile}>
            <div className={gameState[newTile].terrainImage}></div>
            <div className={gameState[initialTile].hasUnit.country + gameState[initialTile].hasUnit.name}></div>
            <div className="tileCursor"></div>
            {showBlueTile}
            {tileMenu}

        </div>
        setMap(mapTiles)

    }

    function confirmAction(initialTile, newTile, functionToRun) {


        //We run the command depending on what it was meant to be
        functionToRun

        //console.log(command)
        resetGrid()
    }


    // ACTION FUNCTIONS

    function moveAction(initialTile, newTile) {
        //lets update our local copy of mapdata (instead of issuing a new get request everytime we move, we just update the local variable)
        if  (initialTile !== newTile) {
            gameState[initialTile].terrainCapture = 0
            gameState[newTile].hasUnit = gameState[initialTile].hasUnit
            gameState[initialTile].hasUnit = false
        }

    }

    function captureAction(initialTile, newTile) {
        let countryTags = {
            orangeStar: "os",
            blueMoon: "bm"
        }

        let currentCapture = gameState[newTile].terrainCapture

        gameState[newTile].terrainCapture = currentCapture + 100
        console.log(currentCapture)
        if (gameState[newTile].terrainCapture >= 200) {
            gameState[newTile].terrainOwner = gameState[newTile].hasUnit.country
            gameState[newTile].terrainImage = countryTags[gameState[newTile].hasUnit.country] + gameState[newTile].terrainImage.slice(2,3)
        }
        moveAction(initialTile, newTile)


    }

    function buildAction(initialTile, data) {
        mapTiles[initialTile] = <div key={initialTile} onClick={() => {
            checkPath(initialTile)
        }} className={`mapTile`} id={initialTile}>
            <div className={gameState[initialTile].terrainImage}></div>
            <div className={data.ownerShip + data.unit.menuName}></div>
            <div className="tileCursor"></div>
        </div>

        //we update the new unit in has tile with the correct information
        gameState[initialTile].hasUnit = {
            id: data.id,
            name: data.unit.menuName,
            country: data.ownerShip,
            hp: 100,
            status: "used"
        }


    }


    function sendToDatabase(initialTile, newTile) {
        //lets send the move to the database so its saved
        axios.post('/moveUnit', {
            initialIndex: initialTile,
            newIndex: newTile,
            unit: gameState[initialTile].hasUnit
        }).then((response) => {

        }).catch(error => console.log(error));

    }


    return (
        <div>
            <div className="gameBox">
                <h1>Caustic Finale</h1>
                <button onClick={socketFunction}> touchme</button>
                <div className={`gridSize18 mapGrid`}>
                    {map}
                </div>
            </div>
        </div>
    )

}

