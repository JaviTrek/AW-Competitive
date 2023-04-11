import React, {useEffect, useState} from "react";
import {pathFinding} from "./gameLogic/pathfinding"
import {moveUnit} from "./gameLogic/moveUnit"
import '../../App.sass'
import axios from "axios";
import {unitType} from "./gameLogic/unitType";
import {findTargets} from "./gameLogic/validTargets";
import {battleProbabilities, damageCalculator} from "./gameLogic/damageCalculator";
import {CurrentPlayer} from "../CurrentPlayer";
import {useNavigate} from "react-router-dom";
import io from "socket.io-client";
import {repairUnit} from "./gameLogic/repairUnit";

axios.defaults.withCredentials = true
let connectionURL = 'http://localhost:4000'
let socket = io.connect(connectionURL)
let countriesOrder = ['orangeStar', 'blueMoon']
let gameState = []
let playerState = {}
let movePath = []
let mapTiles = []
let gameID = window.location.search.substring(1)


export function ParsedMap() {

useEffect(()=> {
    socket.emit("joinRoom", {gameID})
}, [socket])

    const navigate = useNavigate();
    let [map, setMap] = useState([])
    let [players, setPlayers] = useState({

        turn: 0, day: 1,
        unitsToRefresh: [],
        orangeStar: {
            _id: 1,
            username: 'orangeStar',
            CO: 'Sami',
            img: `../../images/CO/Sami-Full.png`,
            color: 'orange',
            armyValue: "0",
            timePlayed: "00:00:00",
            unitCount: 0,
            properties: 3,
            gold: 3000,
        }, blueMoon: {
            _id: 2,
            username: 'blueMoon',
            CO: 'Max',
            img: `../../images/CO/Max-Full.png`,
            color: 'blue',
            armyValue: "0",
            timePlayed: "00:00:00",
            unitCount: 0,
            properties: 3,
            gold: 0,
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
        axios.get(`${connectionURL}/getGameState?${gameID}`)
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
        setPlayers(playerState)
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
        let blueTiles = pathFinding(18, 18, gameState[initialTile].tileUnit.id, initialTile, gameState, mapTiles)

        blueTiles.tilesToDraw.forEach((tile) => {
            //default blue tile square
            let tileSquare = <div className='tileMove' onMouseEnter={() => {
                drawPath(blueTiles, tile.index, initialTile)
            }}></div>

            //there is an enemy in this tile!
            if (tile.hasEnemy) {
                tileSquare = <div className='tileEnemy' onMouseEnter={() => {
                    battleForecast(initialTile, tile.index, false)
                }} onMouseLeave={() => {
                    changeTile(tile.index, {
                        tileUnit: <div
                            className={gameState[tile.index].tileUnit.country + gameState[tile.index].tileUnit.name + " tileUnit"}></div>,
                        tileSquare: tileSquare,
                        showMenu: null,
                        useFunction: () => {
                            newPosition(blueTiles, tile.index, initialTile)
                        }
                    })
                    newMap = mapTiles.slice()
                    setMap(newMap)
                }}></div>
            }

            changeTile(tile.index, {
                tileUnit: gameState[tile.index].tileUnit ? <div
                    className={gameState[tile.index].tileUnit.country + gameState[tile.index].tileUnit.name + " tileUnit"}></div> : null,
                tileSquare: tileSquare,
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
                tileSquare: <div className="tileMove" onMouseEnter={() => {
                    drawPath(blueTiles, tile, initialTile)
                }}></div>,
                showMenu: null,
                useFunction: () => {
                    newPosition(blueTiles, tile, initialTile)
                }
            })
        })
        //we find our new movePath AND render it
        movePath = moveUnit(blueTiles, targetTile)
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

    function battleForecast(initialTile, attackTile, canAttack) {
        //default tile square
        let newTile = movePath[movePath.length - 1] ? movePath[movePath.length - 1] : movePath[0] ? movePath[0] : initialTile
        //lets show our battle forecast (damage we will do and receive)
        let forecast = battleProbabilities({
            unit: gameState[initialTile].tileUnit, terrain: gameState[newTile].terrainType,
        }, {
            unit: gameState[attackTile].tileUnit, terrain: gameState[attackTile].terrainType,
        })
        //the little menu that shows our battle forecast
        const tileMenu =
            <div className="forecast">
                <div className="column3">
                    <h1>BATTLE FORECAST</h1>
                </div>
                <div className={`${gameState[initialTile].tileUnit.country}Background forecastUnit`}>
                    <div className="forecastRelative">
                        <div
                            className={gameState[initialTile].tileUnit.country + gameState[initialTile].tileUnit.name}></div>
                        <div className={`HP${Math.ceil(gameState[initialTile].tileUnit.hp / 10)}Icon`}></div>
                    </div>

                    <div className={`hpBar`}>
                        <div
                            className={`hpBarWidth${Math.ceil(gameState[initialTile].tileUnit.hp / 10)}   ${gameState[initialTile].tileUnit.country}Bar`}></div>
                    </div>
                </div>
                <div className="forecastValues">
                    <div className={`${gameState[initialTile].tileUnit.country}Background`}>
                        <h2>{`ATTACK ${forecast[0][0]}-${forecast[0][1]}`}%</h2>
                    </div>

                    <div className={`${gameState[attackTile].tileUnit.country}Background`}>
                        <h2>{`${forecast[1][1]}-${forecast[1][0]}% COUNTER`}</h2>
                    </div>
                </div>
                <div className={`${gameState[attackTile].tileUnit.country}Background forecastUnit`}>
                    <div className="forecastRelative">
                        <div
                            className={gameState[attackTile].tileUnit.country + gameState[attackTile].tileUnit.name}></div>
                        <div className={`HP${Math.ceil(gameState[attackTile].tileUnit.hp / 10)}Icon`}></div>
                    </div>

                    <div className={`hpBar`}>
                        <div
                            className={`hpBarWidth${Math.ceil(gameState[attackTile].tileUnit.hp / 10)}   ${gameState[attackTile].tileUnit.country}Bar`}></div>
                    </div>
                </div>
            </div>

        changeTile(attackTile, {
            tileUnit: <div
                className={gameState[attackTile].tileUnit.country + gameState[attackTile].tileUnit.name + " tileUnit"}></div>,
            tileSquare: <div className="tileAttack"
                //Mouse Out!
                             onMouseLeave={() => {
                                 changeTile(attackTile, {
                                     tileUnit: <div
                                         className={gameState[attackTile].tileUnit.country + gameState[attackTile].tileUnit.name + " tileUnit"}></div>,
                                     tileSquare: <div className="tileAttack" onMouseEnter={() => {
                                         battleForecast(initialTile, attackTile)
                                     }}></div>,
                                     showMenu: null,
                                     useFunction: () => {
                                         checkActions(attackTile)
                                     }
                                 })
                                 let map;
                                 map = mapTiles.slice()
                                 setMap(map)
                             }}></div>,
            showMenu: tileMenu,
            useFunction: () => {
                if (canAttack) attackAction(initialTile, newTile, attackTile,
                    {
                        unit: gameState[initialTile].tileUnit, terrain: gameState[newTile].terrainType,
                    }, {
                        unit: gameState[attackTile].tileUnit, terrain: gameState[attackTile].terrainType,
                    })
            }
        })
        let newMap;
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

            resetGrid()
            movePath = [newTile]
            //if the unit moves to the same tile it was already in, we don't need to do anything
            if (newTile !== initialTile) {
                // TODO: these movements should go from path[0] (initial tile) to path[path.length -1] (newTile) by moving a tile at a time instead of jumping from start to end (so 0,1,2,3...) because the unit moves through the terrain, it doesnt just teleport to its target location.


                //lets delete/set the unit in the initial tile
                changeTile(initialTile, {
                    tileUnit: null, tileSquare: null, showMenu: null, //we put hp as true so it doesnt appear
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

        let {day, turn} = playerState
        if (gameState[initialTile].tileUnit && countriesOrder[turn] !== gameState[initialTile]?.tileUnit.country) return null
        else if (!gameState[initialTile].tileUnit && countriesOrder[turn] !== gameState[initialTile].terrainOwner) return null
        /*
        TODO:
            -Check if unit clicked shares turn number (so OS is 1, BM is 2), if it doesnt match, then break function since it is not the turn of that player and therefore they cannot move that
            ADDITIONALLY
                check the username, only the target username should be able to move! Maybe we need to change our value of turn to the username that is going to play the next
         */

        //------------------------
        //ITS AN UNIT
        if (await isUnit !== false) {
            //lets check all the validTargets unit can attack and render them
            let validTargets = findTargets(newTile, gameState[initialTile].tileUnit, gameState)

            const unitID = gameState[initialTile].tileUnit.id
            //indirect units are unable to fire if they have moved
            if (initialTile !== newTile && (unitID === 4 || unitID === 7 || unitID === 8)) validTargets = 0

            if (validTargets.length > 0) {
                tileMenu.push(<div className="menuName"
                                   onClick={() => removeMenu(initialTile, newTile)}>Attack</div>)

                validTargets.forEach(tile => {
                    changeTile(tile, {
                        tileUnit: <div
                            className={gameState[tile].tileUnit.country + gameState[tile].tileUnit.name + " tileUnit"}></div>,
                        tileSquare: <div className="tileAttack" onMouseEnter={() => {
                            battleForecast(initialTile, tile, true)
                        }}></div>,
                        showMenu: false,
                        capture: gameState[tile].tileUnit.capture, //lets put a confirm Attack option here
                        useFunction: () => {
                            attackAction(initialTile, newTile, tile, {
                                unit: gameState[initialTile].tileUnit, terrain: gameState[newTile].terrainType,
                            }, {
                                unit: gameState[tile].tileUnit, terrain: gameState[tile].terrainType,
                            })
                        }
                    })
                })
            }


            tileMenu.push(<div className="menuName"
                               onClick={() => moveAction(initialTile, newTile)}>Wait</div>)
            //if its an infantry and also on an enemy/neutral property, allow to capture
            if (gameState[initialTile].tileUnit.id === 0 || gameState[initialTile].tileUnit.id === 1) {
                if (gameState[newTile].terrainType === "property" && gameState[newTile].terrainOwner !== gameState[initialTile].tileUnit.country) {
                    tileMenu.push(<div className="menuName"
                                       onClick={() => captureAction(initialTile, newTile)}>Capture</div>)
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
                                   onClick={() => buildAction(initialTile, {
                                       ownerShip: ownerShip, unit: unit, id: id
                                   })}>
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
            tileSquare: null,
            showMenu: tileMenu,
            capture: null,
            hpTile: initialTile,
            useFunction: null
        })
        setMap(mapTiles)
    }


    //this is the function that we run after any action
    function confirmAction(initialTile, newTile, attackedTile) {
        if (!attackedTile) attackedTile = false
        else attackedTile = {index: attackedTile, gameState: gameState[attackedTile]}
        playerState.unitsToRefresh.push(newTile)
        axios.post(`${connectionURL}/saveGameAction?${gameID}`,

            {
                initialTile: {index: initialTile, gameState: gameState[initialTile]},
                newTile: {index: newTile, gameState: gameState[newTile]},
                attackedTile: attackedTile, playerState: playerState
            },
        )
            .then(res => {
                console.log(res)
                if (res.data.error === 'error') {
                    console.log('error')
                    navigate('/')
                    throw new Error()
                }
                socket.emit('sendAction', {gameState: gameState, playerState: playerState, room: gameID})
            }).catch(e => {
            console.log(e)
            navigate(`/game?${gameID}`)
        })

        resetGrid()
    }


    function passTurn() {
        //lets update the day and whose turn it is
        playerState.day++
        if (playerState.turn === 1) {
            playerState.turn--
            playerState[countriesOrder[0]].gold += playerState[countriesOrder[0]].properties * 1000
        } else {
            playerState.turn++
            playerState[countriesOrder[1]].gold += playerState[countriesOrder[1]].properties * 1000
        }
        //lets repair and charge for repairs!
        let repairBill = 0;
        gameState.forEach(tile => {
            let unit = tile.tileUnit
            if (unit) unit.isUsed = false;
            if (tile.terrainOwner === tile?.tileUnit.country && tile?.tileUnit.country === countriesOrder[playerState.turn] && tile?.tileUnit.hp !== 100) {
                repairBill += repairUnit(tile)
            }
        });
        playerState[countriesOrder[playerState.turn]].gold -= repairBill
        axios.post(`${connectionURL}/passTheTurn?${gameID}`,
            {playerState: playerState, gameState: gameState}, null)
            .then(res => {
                console.log(res)
                console.log(res.data.error === 'error')
                if (res.data.error === 'error') {
                    console.log('error')
                    navigate('/')
                    throw new Error()
                }
                playerState.unitsToRefresh = []
                socket.emit('sendAction', {gameState: gameState, playerState: playerState, room: gameID})
            }).catch(e => {
            navigate(`/game?${gameID}`)
        })
        resetGrid()
    }

    useEffect(() => {
        //we listen for actions being sent
        socket.on("receiveAction", res => {
            console.log('emited')
            playerState = res.playerState
            gameState = res.gameState
            resetGrid()
        })
    }, [socket])


    function attackAction(initialTile, newTile, attackedTile, atk, def) {
        if (countriesOrder[playerState.turn] !== gameState[initialTile].tileUnit.country) return null

        let results = damageCalculator(atk, def)
        gameState[initialTile].tileUnit.hp = results.atkHP
        gameState[attackedTile].tileUnit.hp = results.defHP
        if (results.atkHP <= 0) gameState[initialTile].tileUnit = false
        if (results.defHP <= 0) gameState[attackedTile].tileUnit = false
        moveAction(initialTile, newTile, attackedTile)
    }

    // ACTION FUNCTIONS

    function moveAction(initialTile, newTile, attackedTile) {
        //lets update our local copy of mapdata (instead of issuing a new get request everytime we move, we just update the local variable)
        if (initialTile !== newTile) {
            gameState[initialTile].terrainCapture = 0
            gameState[newTile].tileUnit = gameState[initialTile]?.tileUnit
            gameState[initialTile].tileUnit = false
            // if the unit moves to a tile with 0 capture, then they lose the capture icon
            if (gameState[newTile].terrainCapture === 0 && gameState[newTile]?.tileUnit) gameState[newTile].tileUnit.capture = null
        }
        if (gameState[newTile].tileUnit) gameState[newTile].tileUnit.isUsed = true
        confirmAction(initialTile, newTile, attackedTile)
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
        confirmAction(initialTile, initialTile)
    }

    function removeMenu(initialTile, newTile) {
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
        let map;
        map = mapTiles.slice()
        setMap(map)
    }


    return (<div>
        <div className="gameBox">
            <div className="gameTitle column3">
                <h1>Caustic Finale</h1>
                <h1>Day: {players.day}</h1>
                <button onClick={passTurn}> Pass Turn</button>
            </div>

            <div className={`playerBox ${playerState.turn === 0 ? "activePlayer" : "inactivePlayer"}`}>

                <CurrentPlayer
                    selectedCharacter={players[countriesOrder[0]].CO}
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
                    selectedCharacter={players[countriesOrder[1]].CO}
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
