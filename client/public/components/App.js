import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import '../style/App.sass'
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

export function App() {

    return (
        <div>
            <h2>Add a new User to MongoDB:</h2>
            <a href="/createNewGame">
                <button> Try creating New Game</button>

            </a>
            <a href="/game">
                <button> See game</button>

            </a>


        </div>
    )
}