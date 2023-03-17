import React from "react";

function moveUnit(movementArray, targetTile) {
    let previous = movementArray.previous
    let path = []

    for (let i = targetTile; i !== null; i = previous[i]) {
        path.push(i);
    }
    //lets reverse it so we don't start at the end
    return path.reverse()


}
export {moveUnit};
