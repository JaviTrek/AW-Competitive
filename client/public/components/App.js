import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
const pp = "Javi";
export function App() {
    console.log('i was read')
    const [data, setData] = useState({})
    useEffect(()=> {
        axios.get("/home")
            .then(res => {
                console.log(res)
                setData(res.data)
            }).catch(e => console.error(e));
    }, [pp]);

    return (
        <div>
            <h1> Welcome {data.name ? data.name : "newbie"}!</h1>
        </div>
    )
}