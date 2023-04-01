import {unitType} from "./unitType";
import React from "react";

function damageCalculator(attacker, defender) {
    let damageChart = [
        [55, 45, 12, 14, 15, 5, 5, 26, 25, 1, 5, 1, 1, 30, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [65, 55, 85, 75, 70, 55, 65, 85, 85, 15, 55, 15, 5, 35, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [70, 65, 35, 45, 45, 6, 4, 28, 55, 1, 6, 1, 1, 35, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [90, 85, 80, 70, 75, 70, 75, 80, 80, 45, 70, 40, 15, 0, 0, 0, 0, 0, 0, 55, 55, 65, 60, 40, 45],
        [75, 70, 85, 75, 70, 55, 65, 85, 85, 15, 55, 15, 10, 40, 10, 0, 0, 0, 0, 10, 10, 5, 1, 1, 1],
        [105, 105, 60, 50, 50, 25, 45, 55, 55, 10, 25, 5, 1, 120, 120, 75, 65, 75, 120, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 120, 100, 100, 100, 120, 0, 0, 0, 0, 0, 0],
        [95, 90, 90, 80, 80, 80, 85, 90, 85, 55, 80, 50, 25, 0, 0, 0, 0, 0, 0, 60, 60, 85, 85, 55, 60],
        [105, 95, 105, 105, 105, 85, 105, 105, 105, 55, 85, 45, 25, 45, 12, 0, 0, 0, 0, 35, 35, 45, 10, 10, 10],
        [95, 90, 90, 80, 80, 80, 85, 90, 85, 55, 80, 50, 25, 105, 105, 75, 65, 75, 120, 60, 60, 85, 85, 55, 60],
        [125, 115, 125, 125, 115, 105, 115, 125, 125, 75, 105, 55, 35, 55, 22, 0, 0, 0, 0, 40, 50, 50, 15, 15, 15],
        [135, 125, 195, 195, 195, 180, 195, 195, 195, 125, 180, 115, 65, 55, 22, 0, 0, 0, 0, 105, 75, 65, 45, 45, 45],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [75, 75, 55, 60, 65, 55, 25, 65, 65, 25, 55, 20, 10, 95, 65, 0, 0, 0, 0, 25, 25, 55, 25, 25, 25],
        [110, 110, 105, 105, 105, 105, 95, 105, 105, 95, 105, 90, 35, 0, 0, 0, 0, 0, 0, 95, 95, 85, 95, 75, 75],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 55, 85, 120, 0, 0, 0, 0, 0, 0],
        [90, 90, 85, 85, 75, 75, 50, 85, 85, 70, 80, 60, 15, 95, 85, 70, 45, 55, 120, 65, 65, 35, 55, 45, 45],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115, 115, 65, 55, 100, 120, 25, 0, 0, 90, 0, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 95, 95, 25, 55, 55, 75],
        [95, 90, 90, 80, 80, 80, 85, 90, 85, 55, 80, 50, 25, 0, 0, 0, 0, 0, 0, 95, 95, 95, 95, 50, 60],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115, 115, 100, 100, 100, 120, 0, 0, 0, 0, 0, 0]]


     let atk = {
        id: attacker.unit.id,
        hp: attacker.unit.hp ,
        atk: 100,
        def: 100,
        terrain: attacker.terrain
    }

     let def = {
        id: defender.unit.id,
        hp: defender.unit.hp,
        atk: 100,
        def: 100,
        terrain: defender.terrain
    }

    const terrainStars = {
        "plain":     1,
        "mountain":   3,
        "forest":     2,
        "river":      0,
        "road":       0,
        "sea":        0,
        "shoal":      0,
        "reef":       1,
        "pipe":       0,
        "base":       3,
        "port":       3,
        "property": 3,
    };

    const luckATK = Math.floor(Math.random() * 10)


    let hpATK = Math.ceil(atk.hp / 10)

    let hpDEF = Math.ceil(def.hp / 10)
    console.log(hpATK)
    console.log(hpDEF)
    let damageFormula =
        (((damageChart[atk.id][def.id] * atk.atk) / 100) + luckATK)

        * hpATK /10 *

        ((200 - (def.def + terrainStars[def.terrain] * hpDEF)) / 100)


    console.log(damageFormula)
    def.hp = def.hp - Math.floor(damageFormula)
    hpDEF = Math.ceil(def.hp / 10)
    console.log(hpDEF)

    let counterFormula;
    const luckDEF = Math.floor(Math.random() * 10)
    if (def.hp > 0) {
        console.log('im running')
        counterFormula =
            (((damageChart[def.id][atk.id] * def.atk) / 100) + luckDEF)
            * hpDEF/10 *
            ((200 - (atk.def + terrainStars[atk.terrain] * hpATK )) / 100)
        console.log(counterFormula)
        atk.hp = atk.hp - Math.floor(counterFormula)
    } else {
        console.log('else is running')
        counterFormula = 0
    }

    return {
        atkHP: atk.hp,
        defHP:  def.hp,
    }


}


export {damageCalculator};