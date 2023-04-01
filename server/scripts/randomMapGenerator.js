const fs = require('fs')



/*

EXPRESS CODE!!!

// Random Map Generator

const createMap = require('./scripts/randomMapGenerator')
createMap(18, 18, "randomMap")
const randomMap = require("./scripts/randomMap.json");
app.get('/map/randomMap', (req, res) => {
    res.json(randomMap)
});


 */


// ['plains', 'mountain', "forest", "road", "bridge", "factory", "city", "shoal", "river"];
//TODO: Make the random map generator have better parameters such as the possibility of using templates or knowing that it should spam 2 bases 1 hq per player and other parameters that will make it generate better random maps.
const terrainTypes = [];
// our function used to hold our variables in the array.
async function terrainParameters(terrain, value) {
    for (let i = 0; i < value; i++) {
        terrainTypes.push(terrain)
    }
}
//These terrain parameters make it so a % of our tiles are this type. So below, every tile has a 50% of being pl/plains or 5% to be mo/mountains and so on for each one of these
// 80%
terrainParameters('pl0', 50)
terrainParameters('ro1', 10)
terrainParameters('ci0', 10)
terrainParameters('sh1', 10)
// 10%
terrainParameters('fo0', 7)
terrainParameters('ri1', 2)
terrainParameters('fa0', 1)
//10%
terrainParameters('br1', 5)
terrainParameters('mo0', 5)

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



// To be honest the function below is quite convoluted, its a bit "simple" but its simply creating a sequence of 2 initial numbers for columns and another 2 numbers for rows, so 0101 means first column first row (top corner).
module.exports = (columns, rows, name) => {
    let mapArray = [];
    let mirrorMap = [];
    for (let i = 1; i < (columns / 2) + 1; i++) {
        for (let k = 1; k < rows + 1; k++) {
            // Lets select a random terrain for our terrain tile
            let randomTerrain = Math.floor(Math.random() * terrainTypes.length);
            //Lets set up the terrain variable
            let tile = `${terrainTypes[randomTerrain]}00000xx`
            // k is less than 10 so we will use our 0s (0i0k columnsrows))
            if (k < 10) {
                mapArray.push([`0${i}0${k}`, tile])
                // mirror tile
                // everything goes reverse in here, k needs to not have a 0, it is a double digit
                mirrorMap.push([`${columns - i + 1}${columns - k + 1}`, tile])
            }
            // k is more than 10 so we dont need the 0 for it (ik columnrows)
            else {
                mapArray.push([`0${i}${k}`, tile])
                // mirror tile
                // everything goes reverse in here, k needs to have a 0, it is a single digit
                mirrorMap.push([`${columns - i + 1}0${columns - k + 1}`, tile])
            }
        }
    }

    // Now lets add our reverse map to our normal map
    // --1 because we want to start from the last element to the first one since we want to be mirrored
    for (let i = mirrorMap.length - 1; i >= 0; i--) {
        mapArray.push(mirrorMap[i])
    }

    //we write our function
    fs.writeFileSync(`./scripts/${name}.json`, JSON.stringify(mapArray), 'utf-8');
    return mapArray

};