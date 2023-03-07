import React from "react";

import {useState, useEffect} from "react";
import axios from "axios";
import '../style/App.sass'

export function About() {

    const [about, setAbout] = useState()
    useEffect(() => {
        axios.get("/about")
            .then(res => {
                setAbout(res)
                console.log(res.data)

            }).catch(e => console.error(e));
    }, []);

    return (
        <div>
            <h1>About Page!</h1>
            <p>This is the about component!</p>

        </div>
    )
}