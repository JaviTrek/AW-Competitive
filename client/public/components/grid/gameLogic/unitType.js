import React from "react";

function unitType(unitIndex) {
    // Here are our units, their names, menu name, cost, move, move type, etc
    const unitData = [
        {name: "infantry",   menuName: "Infantry",   cost: 1000,  move: 3, moveType: "F", range: [1, 1], facility: "base"},
        {name: "mech",       menuName: "Mech",       cost: 3000,  move: 2, moveType: "B", range: [1, 1], facility: "base"},
        {name: "recon",      menuName: "Recon",      cost: 4000,  move: 8, moveType: "W", range: [1, 1], facility: "base"},
        {name: "apc",        menuName: "APC",        cost: 5000,  move: 6, moveType: "T", range: [0, 0], facility: "base"},
        {name: "artillery",  menuName: "Artillery",  cost: 6000,  move: 5, moveType: "T", range: [2, 3], facility: "base"},
        {name: "tank",       menuName: "Tank",       cost: 7000,  move: 6, moveType: "T", range: [1, 1], facility: "base"},
        {name: "antiair",    menuName: "Anti-Air",   cost: 8000,  move: 6, moveType: "T", range: [1, 1], facility: "base"},
        {name: "missile",    menuName: "Missile",    cost: 12000, move: 4, moveType: "W", range: [3, 5], facility: "base"},
        {name: "rocket",     menuName: "Rocket",     cost: 15000, move: 5, moveType: "W", range: [3, 5], facility: "base"},
        {name: "mdTank",     menuName: "Md.Tank",    cost: 16000, move: 5, moveType: "T", range: [1, 1], facility: "base"},
        {name: "piperunner", menuName: "Piperunner", cost: 20000, move: 9, moveType: "P", range: [2, 5], facility: "base"},
        {name: "neotank",    menuName: "Neotank",    cost: 22000, move: 6, moveType: "T", range: [1, 1], facility: "base"},
        {name: "megatank",   menuName: "Mega Tank",  cost: 28000, move: 4, moveType: "T", range: [1, 1], facility: "base"},

        {name: "tcopter",    menuName: "T-Copter",   cost: 5000,  move: 6, moveType: "A", range: [0, 0], facility: "airport"},
        {name: "bcopter",    menuName: "B-Copter",   cost: 9000,  move: 6, moveType: "A", range: [1, 1], facility: "airport"},
        {name: "bomber",     menuName: "Bomber",     cost: 22000, move: 7, moveType: "A", range: [1, 1], facility: "airport"},
        {name: "figther",    menuName: "Fighter",    cost: 20000, move: 9, moveType: "A", range: [1, 1], facility: "airport"},
        {name: "stealth",    menuName: "Stealth",    cost: 24000, move: 6, moveType: "A", range: [1, 1], facility: "airport"},
        {name: "blackBomb",  menuName: "Black Bomb", cost: 25000, move: 9, moveType: "A", range: [0, 0], facility: "airport"},


        {name: "blackBoat",  menuName: "Black Boat", cost: 7500,  move: 7, moveType: "L", range: [0, 0], facility: "port"},
        {name: "lander",     menuName: "Lander",     cost: 12000, move: 6, moveType: "L", range: [0, 0], facility: "port"},
        {name: "cruiser",    menuName: "Cruiser",    cost: 18000, move: 6, moveType: "S", range: [1, 1], facility: "port"},
        {name: "sub",        menuName: "Sub",        cost: 20000, move: 5, moveType: "S", range: [1, 1], facility: "port"},
        {name: "battleship", menuName: "Battleship", cost: 28000, move: 5, moveType: "S", range: [2, 6], facility: "port"},
        {name: "carrier",    menuName: "Carrier",    cost: 30000, move: 5, moveType: "S", range: [3, 8], facility: "port"},

    ];
return unitData[unitIndex]

}
export {unitType};
