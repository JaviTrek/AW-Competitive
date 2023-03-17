import React from "react";

function checkTerrain(moveType, nextTile, initialTile) {

    //if the next tile has an unit AND its not from the same country, return 9 movement to cross
    if (nextTile.tileUnit && nextTile.tileUnit?.country !== initialTile.tileUnit.country) return "A"

    const movementCostClear = {
        "plain":     {F: 1, B: 1, T: 1, W: 2, A: 1, P: 9, S: 9, L: 9},
        "mountain":   {F: 2, B: 1, T: 9, W: 9, A: 1, P: 9, S: 9, L: 9},
        "forest":      {F: 1, B: 1, T: 2, W: 3, A: 1, P: 9, S: 9, L: 9},
        "river":      {F: 2, B: 1, T: 9, W: 9, A: 1, P: 9, S: 9, L: 9},
        "road":       {F: 1, B: 1, T: 1, W: 1, A: 1, P: 9, S: 9, L: 9},
        "sea":        {F: 9, B: 9, T: 9, W: 9, A: 1, P: 9, S: 1, L: 1},
        "shoal":      {F: 1, B: 1, T: 1, W: 1, A: 1, P: 9, S: 9, L: 1},
        "reef":       {F: 9, B: 9, T: 9, W: 9, A: 1, P: 9, S: 2, L: 2},
        "pipe":       {F: 9, B: 9, T: 9, W: 9, A: 9, P: 1, S: 9, L: 9},
        "base":       {F: 1, B: 1, T: 1, W: 1, A: 1, P: 1, S: 9, L: 9},
        "port":       {F: 1, B: 1, T: 1, W: 1, A: 1, P: 9, S: 1, L: 1},
        "property": {F: 1, B: 1, T: 1, W: 1, A: 1, P: 9, S: 9, L: 9},
    };

    return movementCostClear[nextTile.terrainType][moveType]



}
export {checkTerrain};
