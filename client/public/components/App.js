import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

import '../style/App.sass'
import '../style/template/template.sass'
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000")

export function App() {

    return (<div>

        <br/>
            <h1>Hello and welcome to the project</h1>
        <p>Right now you can make an account, start a game on CF and/or join/watch other CF games</p>
<br/>

        <h2>Please register to play</h2>
        <p>Recommended to not use your real password but something simple like "123" or "pass" <br/> (even thou we do hash our passwords/do not save anything as plain text)</p>
        <a href="/register">
        <span className="btn">
            Go to registration
        </span>
        </a>
        <br/>
        <br/>
        <a href="/login">
        <span className="btn">
            Go to login
        </span>
        </a>
   <br/>
<br/>
        <h2>Start Playing!</h2>
        <p>You can see current matches, join a match or start your own match!</p>
        <br/>
        <a href="/currentgames">
        <span className="btn">
            Matches already started
        </span>
        </a>
        <br/>
        <br/>
        <a href="/startGames">
        <span className="btn">
            Join a match
        </span>
        </a>
        <br/>
        <br/>
        <a href="/newGame">
        <span className="btn">
            Create your own match
        </span>
        </a>
        <br/>

        </div>);
}
