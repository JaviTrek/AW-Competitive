import React from "react";

import {useState, useEffect} from "react";
import axios from "axios";
import '../App.sass'

export function About() {

    console.log('i WAS GOTTEN')
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
            <h2>This is the about component!</h2>

        </div>
    )
}