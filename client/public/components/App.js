import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import '../style/App.sass'
import io from "socket.io-client"
import {Outlet} from "react-router-dom";
import awLogo from "../images/awLogo.webp"

const socket = io.connect("http://localhost:4000")

export function App() {

    const sendMessage = () => {
        console.log('hello!')
        socket.emit("send_message", {message: "hello"})
    }

    useEffect(() => {
        socket.on("receive_message", data => {
            alert(data.message)
        })
    }, [socket])


    return (
        <div>
            <h2>Add a new User to MongoDB:</h2>
            <button onClick={sendMessage}> Hello!</button>


        </div>
    )
}