import React from "react";

function terrainCost(unit) {

    const movementCostClear = {
        "plain":     {F: 1, B: 1, T: 1, W: 2, A: 1, P: 0, S: 0, L: 0},
        "mountain":   {F: 2, B: 1, T: 0, W: 0, A: 1, P: 0, S: 0, L: 0},
        "wood":      {F: 1, B: 1, T: 2, W: 3, A: 1, P: 0, S: 0, L: 0},
        "river":      {F: 2, B: 1, T: 0, W: 0, A: 1, P: 0, S: 0, L: 0},
        "road":       {F: 1, B: 1, T: 1, W: 1, A: 1, P: 0, S: 0, L: 0},
        "sea":        {F: 0, B: 0, T: 0, W: 0, A: 1, P: 0, S: 1, L: 1},
        "shoal":      {F: 1, B: 1, T: 1, W: 1, A: 1, P: 0, S: 0, L: 1},
        "reef":       {F: 0, B: 0, T: 0, W: 0, A: 1, P: 0, S: 2, L: 2},
        "pipe":       {F: 0, B: 0, T: 0, W: 0, A: 0, P: 1, S: 0, L: 0},
        "base":       {F: 1, B: 1, T: 1, W: 1, A: 1, P: 1, S: 0, L: 0},
        "port":       {F: 1, B: 1, T: 1, W: 1, A: 1, P: 0, S: 1, L: 1},
        "property": {F: 1, B: 1, T: 1, W: 1, A: 1, P: 0, S: 0, L: 0},
    };

}
export {terrainCost};
