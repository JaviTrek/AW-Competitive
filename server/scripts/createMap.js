const fs = require('fs')

// ['plains', 'mountain', "forest", "road", "bridge", "factory", "city", "hq", "shoal", "river"];

const terrainTypes = ['pl', 'mo', "fo", "ro", "br", "fa", "ci", "hq", "sh", "ri"];

/*
How to create a map randomizer
1- Initialize variables
our terrain types

2- Figure out notation method
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

// To be honest the function below is quite convoluted, its a bit "simple"
module.exports = (columns, rows, name) => {


    for (let i = 1; i < columns / 2; i++) {
        for (let k = 1; k < rows; k++) {

            // Lets select a random terrain for our terrain tile
            let randomTerrain = Math.floor(Math.random() * terrainTypes.length);

            //Lets set up the terrain variable
            let tile = `${terrainTypes[randomTerrain]}00000xx`

            // k is less than 10 so we will use our 0s
            if (k < 10) {
                mapObject.set(`0${i}0${k}`, tile)

                // mirror tile
                // everything goes reverse in here, k needs to not have a 0, it is a double digit
                if (columns - i  <= columns / 2 ) mapObject.set(`0${columns - i + 1}${columns - k + 1}`, tile)
                else mapObject.set(`${columns - i + 1}${columns - k + 1}`, tile)
            }
            // k is more than 10 so it doesnt need to bring a 10
            else {
                mapObject.set(`0${i}${k}`, tile)

                // mirror tile
                // everything goes reverse in here, k needs to have a 0, it is a single digit
                if (columns - i  < columns / 2) mapObject.set(`0${columns - i + 1}${columns - k + 1}`, tile)
                else mapObject.set(`${columns - i + 1}0${columns - k + 1}`, tile)
            }
        }
    }


    // replacer function taken from https://stackoverflow.com/questions/49473229/node-js-object-map-while-writing-object-to-file
    // it converts our map into something we can put in a JSON file

    function replacer (key, value) {
        if (value instanceof Map) {
            return {
                map: [...value],
            }
        } else return value;
    }

    fs.writeFileSync('./randomMap.json', JSON.stringify(mapObject, replacer), 'utf-8');
    return mapObject


};

for (let i = 1; i < columns / 2; i++) {
    for (let k = 1; k < rows; k++) {
        // k is less than 10 so we will use our 0s
        if (k < 10) {
            addNewNumber(`0${i}0${k}`)

            // mirror tile
            // everything goes reverse in here, k needs to not have a 0, it is a double digit
            if (columns - i  <= columns / 2 ) addNewNumber(`0${columns - i + 1}${columns - k + 1}`)
            else addNewNumber(`${columns - i + 1}${columns - k + 1}`)
        }
        // k is more than 10 so it doesnt need to bring a 10
        else {
            addNewNumber(`0${i}${k}`)

            // mirror tile
            // everything goes reverse in here, k needs to have a 0, it is a single digit
            if (columns - i  < columns / 2) addNewNumber(`0${columns - i + 1}${columns - k + 1}`)
            else addNewNumber(`${columns - i + 1}0${columns - k + 1}`)
        }
    }
}