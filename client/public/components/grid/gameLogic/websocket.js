import {useEffect} from "react";
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")


function socketFunction (initialTile, newTile, unit) {

    console.log('socket running')

        socket.emit("sendAction", {
            initialTile: initialTile,
            newTile: newTile,
            unit: unit
        })




}

export {socketFunction};
