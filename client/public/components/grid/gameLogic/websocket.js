import {useEffect} from "react";
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")


function socketFunction () {

    console.log('hey')

        socket.emit("send_message", {message: "hello"})
        socket.on("receive_message", data => {
            alert(data.message)
        })

}

export {socketFunction};
