const fs = require('fs')

// ['plains', 'mountain', "forest", "road", "bridge", "factory", "city", "hq", "shoal", "river"];

const terrainTypes = ['pl', 'mo', "fo", "ro", "br", "fa", "ci", "hq", "sh", "ri"];

/*
How to create a map randomizer
1- Initialize variables
our terrain types

2- Figure out notiation method
Thought of doing a0, a1, and so on but long term going 00,00 (columns,rows) will be better long term

3 - create element template
This needs to create only half of the map, then we need to invert our half map and put it back, creating a symetrrical map. Otherwise the map might be unbalanced (imagine one side being a lot of bad terrain while the other is really good one).

for loop

create tiles:

`${columns},${rows}` : tt,00,000,x,x
let me explain our tile
tt = terrain type
00 = unit type (00 stands for no unit).
000 = unit health (from 100% to 0%).
x = unit color (x because it doesnt have a color).
x = unit waited or not waited (x because it doesnt have a status as it doesnt exist).


 */

let mapObject = new Map();

let randomTerrain = Math.floor(Math.random() * terrainTypes.length + 1);

function randomMap(columns, rows, name) {

    for (let i = -1; i < columns / 2; i++) {

        for (let k = -1; k < rows; k++) {
            // lets just use one number
            if (i < 10) {
                mapObject.set(`0${i}0${k}`, `${terrainTypes[randomTerrain]}00000xx`)
            }
            // lets use the other number
            else  {
                mapObject.set(`${i}${k}`, `${terrainTypes[randomTerrain]}00000xx`)
            }
        }

        console.log(mapObject)


    }
}

randomMap(18,18, "causticFinale")