const fs = require('fs')

// ['plains', 'mountain', "forest", "road", "bridge", "factory", "city", "shoal", "river"];

// These numbers are what AWBW uses for its tiles, so we can grab an array by AWBW with these numbers and know what they mean for our notation
const awbwMap = [
    [1, "pl0"], [3 , "fo0"],  [2, "mo0"],

    [34, 'ci0'],   [111, "si0"], [33, "re0"],
    //road
    [15, "ro1"], [19, "ro2"], [16, "ro3"], [20, "ro4"],  [21, "ro6"], [18, "ro8"],
    //shoal
    [30, "sh5"], [29, "sh8"], [32, "sh7"], [31, "sh3"],

    //ocean
    [28, "oc0"],

    //bridge
    [26, "br1"], [27, "br3"],

    //river
    [4, "ri1"], [8, "ri2"], [5, "ri3"], [7, "ri8"], [9, "ri4"],

    //pipe
    [105, "pi2"],

    //pipe ending
    [110, "pe4"], [109, "pe3"],

    //factory
    [35, "fa0"], [39, "fa1"], [44, "fa2"],

    //port
    [37, "po0"],


    //comtower
    [133, "to0"],


    //headquarters
    [42, "hq1"], [47, "hq2"],


]

const causticFinale =
    [34,3,1,5,1,1,34,3,2,2,3,7,9,2,34,26,28,111,
    1,1,34,26,3,1,1,1,39,1,1,5,35,1,1,32,33,28,
    3,7,27,9,34,1,3,1,3,1,42,26,3,1,3,1,30,27,
    27,9,1,1,1,29,28,28,4,27,4,9,1,1,2,3,1,34,
    16,34,3,2,32,30,30,28,37,16,34,1,1,3,1,1,1,2,
    16,1,2,2,3,34,1,3,18,20,3,1,3,1,1,3,35,7,
    35,1,1,1,1,21,15,15,20,1,1,34,1,1,7,27,4,9,
    3,1,34,19,1,3,1,34,3,3,1,1,3,34,5,47,1,3,
    1,1,3,16,1,1,1,2,2,2,3,1,18,15,26,1,1,2,
    2,44,1,21,15,34,1,3,2,2,3,18,20,37,5,3,44,2,
    3,1,1,34,1,1,3,1,3,2,34,16,3,28,28,1,1,3,
    4,27,8,1,3,1,34,3,1,1,1,16,1,32,28,3,1,34,
    2,16,28,29,29,2,1,1,34,1,3,21,34,32,31,1,1,1,
    34,21,19,3,30,31,3,1,16,1,1,1,3,30,1,34,3,1,
    1,3,21,19,3,31,1,34,21,15,19,1,2,2,1,7,27,4,
    133,2,1,21,19,28,8,1,1,3,34,1,2,3,1,26,34,1,
    110,105,2,3,21,15,26,1,39,1,1,1,1,34,7,9,1,3,
    111,109,133,1,34,2,5,3,2,1,3,35,15,15,26,3,1,34
]



// To be honest the function below is quite convoluted, its a bit "simple" but its simply creating a sequence of 2 initial numbers for columns and another 2 numbers for rows, so 0101 means first column first row (top corner).
module.exports = (columns, rows, name) => {

    // We transform our awbwMap into a new parsedMap
    let parsedMap = []
    for (let i = 0; i < causticFinale.length; i++) {

        for (let j = 0; j < awbwMap.length; j++) {
            if (causticFinale[i] === awbwMap[j][0]) {
                parsedMap.push(`${awbwMap[j][1]}00000xx`)
                break
            }
        }

    }



    let mapArray = [];
    for (let i = 1; i < columns + 1; i++) {

        for (let k = 1; k < rows + 1; k++) {


            // k is less than 10 so we will use our 0s (0i0k columnsrows))
            if (k < 10) {
                mapArray.push([`0${i}0${k}`, parsedMap[ (k - 1) + (columns * (i - 1 ))]])
            }
            // k is more than 10 so we dont need the 0 for it (ik columnrows)
            else {
                mapArray.push([`0${i}${k}`, parsedMap[ (k - 1) + (columns * (i - 1 ))]])

            }
        }
    }

    //we write our function
    fs.writeFileSync(`./scripts/${name}.json`, JSON.stringify(mapArray), 'utf-8');
    return mapArray

};