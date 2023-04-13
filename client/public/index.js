import React, { StrictMode } from "react";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";

import {HowToPlay} from "./components/HowToPlay";
import { Template } from "./components/template/Template";
import { App } from "./components/App";
import { Grid } from "./components/grid/Grid";
import { About } from "./components/About";
import { CurrentGames } from "./components/CurrentGames";
import { StartGames } from "./components/StartGames";
import { NewGame } from "./components/NewGame";
import { Register } from "./components/RegisterForm";
import { Login } from "./components/LoginForm";


const container = document.getElementById("app");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        name: "App",
        path: "/",

        element: <Template/>,
        children: [
            {
                name: "App",
                path: "/",
                element: <App/>,
            },
            {
                name: "children",
                path: "children",
                element: <AppChildren/>,
            },
            {
                name: "about",
                path: "about",
                element: <About/>,
            },
            {
                name: "game",
                path: "game",
                element: <Grid/>,
            },
            {
                name: "currentgames",
                path: "currentgames",
                element: <CurrentGames/>,
            },

            {
                name: "newgame",
                path: "newgame",
                element: <NewGame/>,
            },
            {
                path: "register",
                element: <Register/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                name: "howtoplay",
                path: "howtoplay",
                element: <HowToPlay/>,
            },
        ]
    }

]);

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
