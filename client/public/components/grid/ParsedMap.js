import React, {useEffect, useState} from "react";
import {pathFinding} from "./gameLogic/pathfinding"
import {moveUnit} from "./gameLogic/moveUnit"
import {socketFunction} from "./gameLogic/websocket"
import '../../App.sass'
import axios from "axios";
import io from "socket.io-client"
import {unitType} from "./gameLogic/unitType";
import {findTargets} from "./gameLogic/validTargets";
import {battleProbabilities, damageCalculator} from "./gameLogic/damageCalculator";
import {CurrentPlayer} from "../CurrentPlayer";


const socket = io.connect("http://localhost:4000")

let countriesOrder = ['orangeStar', 'blueMoon']
let gameState = []
let playerState = {}
let movePath = []
let mapTiles = []

export function ParsedMap() {
    let [map, setMap] = useState([])
    let [battle, setBattle] = useState({})

    let [players, setPlayers] = useState({

        turn: 0, day: 1,

        orangeStar: {
            _id: 1, username: 'orangeStar',
            CO: 'Sami', img: `../../images/CO/Sami-Full.png`, color: 'orange',  armyValue: "0", timePlayed: "00:00:00", unitCount: 0, properties: 3, gold: 3000,
        }, blueMoon: {
            _id: 2, username: 'blueMoon',
            CO: 'Max', img: `../../images/CO/Max-Full.png`, color: 'blue',  armyValue: "0", timePlayed: "00:00:00", unitCount: 0, properties: 3, gold: 0,
        }
    },)

//lets change a specific tile and its elements
    function changeTile(index, instruction) {
        let {tileUnit, tileSquare, showMenu, hp, capture, hpTile, useFunction} = instruction

        //if there is an hpTile (a tile where HP needs to be displayed, like when an unit moves,
        hpTile = hpTile ? hpTile : index;

        if (!hp && gameState[hpTile].tileUnit.hp <= 100) {
            let hpNumber = gameState[hpTile].tileUnit.hp / 10
            hp = <div className={`HP${Math.ceil(hpNumber)}Icon`}></div>
        }
        if (gameState[index].tileUnit.capture === true) {
            capture = <div className={`captureIcon`}></div>
        }
        mapTiles[index] = <div id={index} key={index} onClick={useFunction}
                               className={gameState[index].tileUnit.isUsed ? 'mapTile stateUsed' : `mapTile`}>
            <div className={`tileTerrain ${gameState[index].terrainImage}`}></div>
            {tileUnit}
            {tileSquare}
            {showMenu}
            {hp}
            {capture}
            <div className="tileCursor"></div>
        </div>
    }

// this function will request our server for a json file, read it and create tiles depending on the json file information
    useEffect(() => {
        axios.get(`/getGameState`)
            .then(res => {
                playerState = res.data.playerState
                gameState = res.data.gameState
                res.data.gameState.forEach((tile, index) => {
                    changeTile(index, {
                        tileUnit: res.data.gameState[index].tileUnit ? <div
                            className={res.data.gameState[index].tileUnit.country + res.data.gameState[index].tileUnit.name + " tileUnit"}></div> : null,
                        tileSquare: null,
                        showMenu: null,
                        useFunction: () => {
                            checkActions(index)
                        }
                    })
                })
                setMap(mapTiles)
                setPlayers(playerState)
            }).catch(e => console.log(e));
    }, [])

    //we listen for actions being sent
    socket.on("receiveAction", data => {

    })

    //function used to resetGrid to original state
    function resetGrid() {

        movePath = []
        let resetMap;
        gameState.forEach((tile, index) => {
            changeTile(index, {
                tileUnit: gameState[index].tileUnit ? <div
                    className={gameState[index].tileUnit.country + gameState[index].tileUnit.name + " tileUnit"}></div> : null,
                tileSquare: null,
                showMenu: null,
                useFunction: () => {
                    checkActions(index)
                }
            })
        })
        //react cheese used to it actualy re-renders
        resetMap = mapTiles.slice()
        setMap(resetMap)
    }

    //Everytime a tile is clicked, we go through these steps
    function checkActions(index) {
        //TODO: Instead of calling gameState[initialTile] or gamestate[newTile] like 100 times, lets put that into a variable to make our code much more compact
        resetGrid()
        if (gameState[index].tileUnit !== false) {
            //show pathfinding options
            checkPath(index)
        } else if (gameState[index].terrainType === "property") {
            //move to building menu actions function
            showMenu(index, index, false)

        }
    }

    //function used to render our blue squares and see what our available movements are
    function checkPath(initialTile) {
        let newMap;
        // lets call our function that can calculate the possible tiles we can move to
        let blueTiles = pathFinding(18, 18, gameState[initialTile], initialTile, gameState, mapTiles)
        //lets show the array of tiles where we can move
        blueTiles.tilesToDraw.forEach((tile) => {
            let tileMove = <div className="tileMove" onMouseEnter={() => {drawPath(blueTiles, tile.index, initialTile)}}></div>

            if (tile.hasEnemy) tileMove = <div className="tileEnemy" onMouseEnter={() => {

                let forecast = battleProbabilities({
                    unit: gameState[initialTile].tileUnit, terrain: gameState[initialTile].terrainType,
                }, {
                    unit: gameState[tile.index].tileUnit, terrain: gameState[tile.index].terrainType,
                })
                console.log(forecast)
            }}
            ></div>

            changeTile(tile.index, {
                tileUnit: gameState[tile.index].tileUnit ? <div
                    className={gameState[tile.index].tileUnit.country + gameState[tile.index].tileUnit.name + " tileUnit"}></div> : null,
                tileSquare: tileMove,
                showMenu: null,
                useFunction: () => {
                    newPosition(blueTiles, tile.index, initialTile)
                }
            })
        })
        // react cheese used to re-render
        newMap = mapTiles.slice()
        setMap(newMap)
    }

    //this is the path we see before moving to a place
    function drawPath(blueTiles, targetTile, initialTile) {
        let newMap;
        //we erase our previous move path
        movePath.forEach((tile) => {
            changeTile(tile, {
                tileUnit: gameState[tile].tileUnit ? <div
                    className={gameState[tile].tileUnit.country + gameState[tile].tileUnit.name + " tileUnit"}></div> : null,
                tileSquare: <div className="tileMove" onMouseEnter={() => {drawPath(blueTiles, tile, initialTile)}}></div>,
                showMenu: null,
                useFunction: () => {
                    newPosition(blueTiles, tile, initialTile)
                }
            })

        })
        //we find our new movePath AND render it
        let shortestPath = moveUnit(blueTiles, targetTile);
        movePath = shortestPath
        movePath.forEach((tile) => {
            changeTile(tile, {
                tileUnit: gameState[tile].tileUnit ? <div
                    className={gameState[tile].tileUnit.country + gameState[tile].tileUnit.name + " tileUnit"}></div> : null,
                tileSquare: <div className="tilePath"></div>,
                showMenu: null,
                useFunction: () => {
                    newPosition(blueTiles, tile, initialTile)
                }
            })

        })
        newMap = mapTiles.slice()
        setMap(newMap)
    }

    //used to calculate the new position of the unit
    function newPosition(movementArray, targetTile, initialTile,) {
        if (gameState[initialTile].tileUnit.isUsed) return undefined;
        let shortestPath = moveUnit(movementArray, targetTile);
        //lets make sure user doesnt put unit on top of another unit (but is able to put the unit on the same spot it started)
        if (gameState[targetTile].tileUnit !== false && shortestPath.length !== 1) {
            checkPath(checkActions(targetTile))
        } else {
            let newTile;
            if (shortestPath.length <= 1) {
                newTile = shortestPath[0]
            } else newTile = shortestPath[shortestPath.length - 1];
            //if the unit moves to the same tile it was already in, we don't need to do anything
            if (newTile !== initialTile) {
                // TODO: these movements should go from path[0] (initial tile) to path[path.length -1] (newTile) by moving a tile at a time instead of jumping from start to end (so 0,1,2,3...) because the unit moves through the terrain, it doesnt just teleport to its target location.
                //lets delete/set the unit in the initial tile
                changeTile(initialTile, {
                    tileUnit: null, tileSquare: <div className="tilePath"></div>, showMenu: null, //we put hp as true so it doesnt appear
                    hp: true, capture: null, useFunction: () => {
                        checkPath(initialTile)
                    }
                })
            }
            showMenu(initialTile, newTile, true)
        }
    }

    async function showMenu(initialTile, newTile, isUnit) {
        let tileMenu = [];
        let showBlueTile;


        let {day, turn} = playerState


        /*
        TODO:
            -Check if unit clicked shares turn number (so OS is 1, BM is 2), if it doesnt match, then break function since it is not the turn of that player and therefore they cannot move that
            ADDITIONALLY
                check the username, only the target username should be able to move! Maybe we need to change our value of turn to the username that is going to play the next
         */

        //------------------------
        //ITS AN UNIT

        if (await isUnit !== false) {

            //lets make it so only the player whose's turn it is can move
            if (countriesOrder[turn] !== gameState[initialTile].tileUnit.country) return null

            //lets check all the validTargets unit can attack and render them
            let validTargets = findTargets(newTile, gameState[initialTile].tileUnit, gameState)
            if (validTargets.length > 0) {
                tileMenu.push(<div className="menuName"
                                   onClick={() => attackAction(initialTile, newTile)}>Attack</div>)

                validTargets.forEach(tile => {
                    changeTile(tile, {
                        tileUnit: <div
                            className={gameState[tile].tileUnit.country + gameState[tile].tileUnit.name + " tileUnit"}></div>,
                        tileSquare: <div className="tileAttack"></div>,
                        showMenu: false,
                        capture: gameState[tile].tileUnit.capture, //lets put a confirm Attack option here
                        useFunction: () => {
                            confirmAction(initialTile, newTile, confirmAttack(initialTile, newTile, tile, {
                                unit: gameState[initialTile].tileUnit, terrain: gameState[newTile].terrainType,
                            }, {
                                unit: gameState[tile].tileUnit, terrain: gameState[tile].terrainType,
                            }))
                        }
                    })
                })
            }
            showBlueTile = <div className="tilePath"></div>
            tileMenu.push(<div className="menuName"
                               onClick={() => confirmAction(initialTile, newTile, moveAction(initialTile, newTile))}>Wait</div>)
            //if its an infantry and also on an enemy/neutral property, allow to capture
            if (gameState[initialTile].tileUnit.id === 0 || gameState[initialTile].tileUnit.id === 1) {
                if (gameState[newTile].terrainType === "property" && gameState[newTile].terrainOwner !== gameState[initialTile].tileUnit.country) {
                    tileMenu.push(<div className="menuName"
                                       onClick={() => confirmAction(initialTile, newTile, captureAction(initialTile, newTile))}>Capture</div>)
                }
            }
        }

            //------------------------------
            // ITS A BUILDING
        else if (await gameState[initialTile].terrainImage.slice(2, 3) === "2") {
            //lets get the array with all the units
            const unitsToBuild = unitType(0, true)
            const ownerShip = gameState[initialTile].terrainOwner
            //lets make an array with each unit, display its information and a function to confirm the action
            unitsToBuild.forEach((unit, id) => {
                let menuOptions = "menuOptions menuNoBuy"
                if (unit.cost <= playerState[ownerShip].gold) menuOptions = "menuOptions"

                tileMenu.push(<div className={menuOptions}
                                   onClick={() => confirmAction(initialTile, newTile, buildAction(initialTile, {
                                       ownerShip: ownerShip, unit: unit, id: id
                                   }))}>
                    <div className={`menu${ownerShip}${unit.menuName}`}></div>
                    <div className={`menuName`}> {unit.menuName}</div>
                    <div className={`menuCost`}> {unit.cost}</div>
                </div>)
            })
        }
        //lets render our complete menu with all of its options
        tileMenu = <div className="tileMenu">
            {tileMenu}
        </div>
        changeTile(newTile, {
            tileUnit: <div
                className={gameState[initialTile].tileUnit.country + gameState[initialTile].tileUnit.name + " tileUnit"}></div>,
            tileSquare: showBlueTile,
            showMenu: tileMenu,
            capture: null,
            hpTile: initialTile,
            useFunction: null
        })
        setMap(mapTiles)
    }


    //this is the function that we run after any action
    function confirmAction(initialTile, newTile, functionToRun) {
        //We run the command depending on what it was meant to be
        functionToRun
        resetGrid()
    }

    function confirmAttack(initialTile, newTile, attackedTile, atk, def) {
        let results = damageCalculator(atk, def)

        gameState[initialTile].tileUnit.hp = results.atkHP
        gameState[attackedTile].tileUnit.hp = results.defHP
        if (results.atkHP <= 0) gameState[initialTile].tileUnit = false
        if (results.defHP <= 0) gameState[attackedTile].tileUnit = false

        moveAction(initialTile, newTile)
    }

    // ACTION FUNCTIONS

    function moveAction(initialTile, newTile) {
        //lets update our local copy of mapdata (instead of issuing a new get request everytime we move, we just update the local variable)
        if (initialTile !== newTile) {
            gameState[initialTile].terrainCapture = 0
            gameState[newTile].tileUnit = gameState[initialTile]?.tileUnit
            gameState[initialTile].tileUnit = false
            // if the unit moves to a tile with 0 capture, then they lose the capture icon
            if (gameState[newTile].terrainCapture === 0 && gameState[newTile]?.tileUnit) gameState[newTile].tileUnit.capture = null
        }
        if (gameState[newTile].tileUnit) gameState[newTile].tileUnit.isUsed = true
    }

    function captureAction(initialTile, newTile) {
        //TODO: this hardcodded countrytag should be taken from axios get data
        let countryTags = {orangeStar: "os", blueMoon: "bm"}
        let currentCapture = gameState[newTile].terrainCapture
        let currentHP = Math.ceil(gameState[initialTile].tileUnit.hp / 10)
        gameState[newTile].terrainCapture = currentCapture + currentHP
        gameState[initialTile].tileUnit.capture = true
        if (gameState[newTile].terrainCapture >= 20) {
            // The property has an owner? (not false), then we reduce their gold by 1k
            if (gameState[newTile].terrainOwner) playerState[gameState[initialTile].terrainOwner].properties--
            gameState[newTile].terrainOwner = gameState[newTile].tileUnit.country
            gameState[newTile].terrainImage = countryTags[gameState[newTile].tileUnit.country] + gameState[newTile].terrainImage.slice(2, 3)
            gameState[initialTile].tileUnit.capture = false
            playerState[gameState[initialTile].tileUnit.country].properties++
            setPlayers(playerState)
        }
        moveAction(initialTile, newTile)


    }

    function buildAction(initialTile, data) {
        //we update the new unit in has tile with the correct information
        gameState[initialTile].tileUnit = {
            id: data.id, name: data.unit.menuName, country: data.ownerShip, hp: 100, isUsed: true, capture: null
        }
        changeTile(initialTile, {
            tileUnit: <div className={`${data.ownerShip + data.unit.menuName + " tileUnit"}`}></div>,
            tileSquare: null,
            showMenu: null,
            useFunction: () => {
                checkPath(initialTile)
            }
        })
        //lets setup the gold changes and unit count
        playerState[data.ownerShip].unitCount++
        playerState[data.ownerShip].gold -= data.unit.cost
        setPlayers((playerState))
    }

    function attackAction(initialTile, newTile) {
        changeTile(newTile, {
            tileUnit: <div
                className={`${gameState[initialTile].tileUnit.country + gameState[initialTile].tileUnit.name}  tileUnit`}></div>,
            tileSquare: <div className="tileMove"></div>,
            hpTile: initialTile,
            showMenu: null,
            useFunction: () => {
                checkPath(newTile)
            }
        })
        let newMap;
        newMap = mapTiles.slice()
        setMap(newMap)
    }


    function sendToDatabase(initialTile, newTile) {

        /*
        todo: this function just needs to be able to update 3 tiles at a time, unit count, income and property count.
         */
        //lets send the move to the database so its saved
        axios.post('/moveUnit', {
            initialIndex: initialTile, newIndex: newTile, unit: gameState[initialTile].tileUnit
        }).then((response) => {

        }).catch(error => console.log(error));
    }

    function passTurn() {
        gameState.forEach(tile => {
            if (tile.tileUnit) tile.tileUnit.isUsed = false;
        });
        playerState.day++
        if (playerState.turn === 1) {
            playerState.turn--
            playerState[countriesOrder[0]].gold += playerState[countriesOrder[0]].properties * 1000
        } else {
            playerState.turn++
            playerState[countriesOrder[1]].gold += playerState[countriesOrder[1]].properties * 1000
        }
        setPlayers(playerState)
        resetGrid()
    }


    return (<div>
        <div className="gameBox">
            <div className="gameTitle column3">
                <h1>Skep is the best Finale</h1>
                <h1>Day: {players.day}</h1>
                <button onClick={passTurn}> Pass Turn</button>
            </div>

            <div className={`playerBox ${playerState.turn === 0 ? "activePlayer" : "inactivePlayer"}`}>

                <CurrentPlayer
                    selectedCharacter={players[countriesOrder[0]].img}
                    userName={players[countriesOrder[0]].username}
                    bannerColor={players[countriesOrder[0]].color}
                    timePlayed={players[countriesOrder[0]].timePlayed}
                    playerBalance={players[countriesOrder[0]].gold}
                    armyCount={players[countriesOrder[0]].unitCount}
                    armyValue={players[countriesOrder[0]].armyValue}
                    income={players[countriesOrder[0]].properties * 1000}
                />
            </div>


            <div className={`gridSize18 mapGrid`}>

                {map}
            </div>

            <div className={`playerBox ${playerState.turn === 1 ? "activePlayer" : "inactivePlayer"}`}>
                <CurrentPlayer
                    selectedCharacter={players[countriesOrder[1]].img}
                    userName={players[countriesOrder[1]].username}
                    bannerColor={players[countriesOrder[1]].color}
                    timePlayed={players[countriesOrder[1]].timePlayed}
                    playerBalance={players[countriesOrder[1]].gold}
                    armyCount={players[countriesOrder[1]].unitCount}
                    armyValue={players[countriesOrder[1]].armyValue}
                    income={players[countriesOrder[1]].properties * 1000}
                />
            </div>
        </div>
    </div>)

}

/*
 <div className={`playerBox ${playerState.turn === 0 ? "activePlayer" : "inactivePlayer"}`} >
                    <h2>{players[countriesOrder[0]]?.username}</h2>
                    <p>Unit Count: {players[countriesOrder[0]]?.unitCount}</p>
                    <p>Income: {players[countriesOrder[0]]?.properties * 1000}</p>
                    <p>Funding: {players[countriesOrder[0]]?.gold}</p>
                </div>
 */