import React from "react";
import {unitType} from "./unitType";
let countriesOrder = ['orangeStar', 'blueMoon']
function repairUnit(tile) {
    let repairBill = 0
    let unit = tile.tileUnit
    let findUnit = unitType(unit.id)
    repairBill += findUnit.cost * 0.2
    unit.hp += 20
    //the unit went above 100hp? then we need to return some money and set hp to 100
    if (unit.hp > 100) {
        repairBill -= findUnit.cost * ((unit.hp - 100)/100)
        unit.hp = 100;
    }
    console.log(repairBill)
    return repairBill




}
export {repairUnit};
