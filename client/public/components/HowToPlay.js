import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "./template/Container";


import '../style/HowToPlay.sass'
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

export function HowToPlay() {

    function HowTo() {

        const [howToInfo, setHowTo] = useState([]);


        // This is the data that includes the headings, information, and imgages
        const data = [
            { heading: 'Focus on capturing properties', instruction: 'Capturing properties is essential to building up your economy and producing more units. Try to prioritize capturing properties early on in the game, and defend them once you have them.', image: 'images/howToPage/pic1.jpg' },
            { heading: "Keep an eye on your opponent's units", instruction: "It's important to be aware of what your opponent is doing and where their units are located. This will help you plan your moves and anticipate their attacks.", image: 'images/howToPage/pic1.jpg' },
            { heading: 'Use terrain to your advantage', instruction: "Terrain can be a powerful tool in Advance Wars. Mountains, forests, and rivers can all provide defensive bonuses to your units, while roads can increase your unit's movement speed. Try to use terrain to your advantage and be aware of how it affects your units.", image: 'images/howToPage/pic1.jpg' },
            { heading: 'Build a balanced army', instruction: "You'll want to have a mix of different units to be able to deal with different types of enemy units. Experiment with different unit combinations to find what works best for you.", image: 'images/howToPage/pic2.jpg' },
            { heading: 'Plan ahead', instruction: "Advance Wars is a game that requires planning and foresight. Try to think several turns ahead and anticipate what your opponent might do. This will help you make more informed decisions and avoid costly mistakes.", image: 'images/howToPage/pic1.jpg' },
            { heading: 'Communicate with your teammate', instruction: "If you're playing a multiplayer game with teammates, communication is the key. Coordinate your efforts and share information about your opponent's movements and intentions.", image: 'images/howToPage/pic1.jpg' },
        ];

        // This is the for loop that renders each instruction, then, depending on the index, reverses the order between image and text
        return data.map(({ heading, instruction, image }, index) => (<li key={index} id={`${index == data.length - 1 ? 'lastInstruction' : ''}`}>
                <h2>{heading}</h2>
                <div class={`instructionSection ${index %2 === 0 ? '' : 'inverted'}`}>
                    <p class="instructionInformation">{instruction}</p>
                    <img class="instructionImage" src={image}/>
                </div>
        </li>))

    }

    // This then returns and displays the what was rendered from the function
    return (
        <div class="howToContainer">
            <Container title="How to Play">
                <HowTo />
            </Container>
        </div>
    );
}
