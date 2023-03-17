import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import '../style/App.sass'

export function AppChildren() {

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
           <h3>I'm a child</h3>
            <p>I can be added to pages!</p>

        </div>
    )
}