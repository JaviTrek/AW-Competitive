const fs = require('fs')


/*


EXPRESS STUFF

this script isnt being used or called from anywhere right now but it basically parses an AWBW map and creates a json file from it

// Map Parser
const mapParser = require('./scripts/awbwMapParser')
mapParser(18, 18, "parsedMap")
const parsedMap = require("./scripts/parsedMap.json");

app.get('/map/parsedMap', (req, res) => {
    res.json(parsedMap)
});



 */

// ['plains', 'mountain', "forest", "road", "bridge", "factory", "city", "shoal", "river"];

// These numbers are what AWBW uses for its tiles, so we can grab an array by AWBW with these numbers and know what they mean for our notation

//TODO: Add all other tile types, we currently only have the tiles present in Caustic Finale
const awbwMap = [
    [1, "pl0"], [3, "fo0"], [2, "mo0"],

    [34, 'ne1'], [111, "si1"], [33, "re0"],
    //road
    [15, "ro1"], [19, "ro2"], [16, "ro3"], [20, "ro4"], [21, "ro6"], [18, "ro8"],
    //shoal
    [30, "sh5"], [29, "sh1"], [32, "sh7"], [31, "sh3"],

    //ocean
    [28, "se0"],

    //bridge
    [26, "br1"], [27, "br3"],

    //river
    [4, "ri1"], [8, "ri2"], [5, "ri3"], [7, "ri8"], [9, "ri4"],

    //pipe
    [105, "pi1"],

    //pipe ending
    [110, "pi4"], [109, "pi3"],


    //port
    [37, "ne4"],


    //comtower
    [133, "ne5"],


    //headquarters
    [42, "os0"], [47, "bm0"],
    //factory
    [35, "ne2"], [39, "os2"], [44, "bm2"],


]

const mapToParse =
    [34, 3, 1, 5, 1, 1, 34, 3, 2, 2, 3, 7, 9, 2, 34, 26, 28, 111,
        1, 1, 34, 26, 3, 1, 1, 1, 39, 1, 1, 5, 35, 1, 1, 32, 33, 28,
        3, 7, 27, 9, 34, 1, 3, 1, 3, 1, 42, 26, 3, 1, 3, 1, 30, 27,
        27, 9, 1, 1, 1, 29, 28, 28, 4, 27, 4, 9, 1, 1, 2, 3, 1, 34,
        16, 34, 3, 2, 32, 30, 30, 28, 34, 16, 34, 1, 1, 3, 1, 1, 1, 2,
        16, 1, 2, 2, 3, 34, 1, 3, 18, 20, 3, 1, 3, 1, 1, 3, 35, 7,
        35, 1, 1, 1, 1, 21, 15, 15, 20, 1, 1, 34, 1, 1, 7, 27, 4, 9,
        3, 1, 34, 19, 1, 3, 1, 34, 3, 3, 1, 1, 3, 34, 5, 47, 1, 3,
        1, 1, 3, 16, 1, 1, 1, 2, 2, 2, 3, 1, 18, 15, 26, 1, 1, 2,
        2, 44, 1, 21, 15, 34, 1, 3, 2, 2, 3, 18, 20, 34, 5, 3, 44, 2,
        3, 1, 1, 34, 1, 1, 3, 1, 3, 2, 34, 16, 3, 28, 28, 1, 1, 3,
        4, 27, 8, 1, 3, 1, 34, 3, 1, 1, 1, 16, 1, 32, 28, 3, 1, 34,
        2, 16, 28, 29, 29, 2, 1, 1, 34, 1, 3, 21, 34, 32, 31, 1, 1, 1,
        34, 21, 19, 3, 30, 31, 3, 1, 16, 1, 1, 1, 3, 30, 1, 34, 3, 1,
        1, 3, 21, 19, 3, 31, 1, 34, 21, 15, 19, 1, 2, 2, 1, 7, 27, 4,
        133, 2, 1, 21, 19, 28, 8, 1, 1, 3, 34, 1, 2, 3, 1, 26, 34, 1,
        110, 105, 2, 3, 21, 15, 26, 1, 39, 1, 1, 1, 1, 34, 7, 9, 1, 3,
        111, 109, 133, 1, 34, 2, 5, 3, 2, 1, 3, 35, 15, 15, 26, 3, 1, 34,
    ]


// To be honest the function below is quite convoluted, its a bit "simple" but its simply creating a sequence of 2 initial numbers for columns and another 2 numbers for rows, so 0101 means first column first row (top corner).
module.exports = (columns, rows, name) => {

    // We transform our awbwMap into a new parsedMap
    let missingTiles = [];
    let parsedMap = [];

    for (let i = 0; i < mapToParse.length; i++) {

        for (let j = 0; j < awbwMap.length; j++) {
            let terrainType;
            let ownerShip;
            let country;
            if (mapToParse[i] === awbwMap[j][0]) {
                // we insert this type because tiles need a type
                switch (awbwMap[j][1].slice(0, 2)) {
                    case "pl":
                        terrainType = "plain"
                        break;
                    case "fo":
                        terrainType = "forest"
                        break;
                    case "mo":
                        terrainType = "mountain"
                        break;
                    case "sh":
                        terrainType = "shoal"
                        break;
                    case "ri":
                        terrainType = "river"
                        break;
                    case "ro":
                        terrainType = "road"
                        break;
                    case "pi":
                        terrainType = "pipe"
                        break;
                    case "re":
                        terrainType = "reef"
                        break;
                    case "se":
                        terrainType = "sea"
                        break;
                    default:
                        terrainType = "property"
                }

                switch (awbwMap[j][1].slice(0, 2)) {
                    case "bm":
                        ownerShip = "blueMoon"
                        break;
                    case "os":
                        ownerShip = "orangeStar"
                        break;
                    default:
                        ownerShip = false
                }


                if (j % 7 === 6)
                    parsedMap.push({
                        terrainImage: awbwMap[j][1],
                        terrainType: terrainType,
                        terrainOwner: ownerShip,
                        terrainCapture: 0,
                        tileUnit: {
                            id: 0,
                            name: "Infantry",
                            country: "orangeStar",
                            hp: Math.floor(Math.random() * (10 - 1) + 1),
                            isUsed: false,
                            capture: false
                            //ammo
                            //gas

                        }

                    })
                else
                    parsedMap.push({
                        terrainImage: awbwMap[j][1],
                        terrainType: terrainType,
                        terrainOwner: ownerShip,
                        terrainCapture: 0,
                        tileUnit: false
                    })

                break
            }
            if (j >= awbwMap.length - 1) missingTiles.push(mapToParse[i])

        }

    }
    //logs any tiles that we havent added
    //console.log(missingTiles)


    //TODO:this needs to be sent to database when creating a game
    let mapData = {
        mapData: {
            mapName: "Caustic Finale",
            columns: 18,
            rows: 18,
            players: 2,
            author: "Hellraider",
            published: "05/11/2008",
        },
        gameState: parsedMap
    }


    //we write our function
    fs.writeFileSync(`./scripts/${name}.json`, JSON.stringify(mapData), 'utf-8');
    return mapData

};