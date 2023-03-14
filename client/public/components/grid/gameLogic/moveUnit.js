import React from "react";

function moveUnit(movementArray, targetTile) {
    console.log(targetTile)
    console.log(movementArray)
    let previous = movementArray.previous
    let path = []

    for (let i = targetTile; i !== null; i = previous[i]) {
        path.push(i);
    }
    //lets reverse it so we don't start at the end
    const reversePath = path.reverse()

    return reversePath


}
export {moveUnit};
