import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import {App} from "./components/App"
import {Grid} from "./components/grid/Grid"
import {About} from "./components/About"
import {AppChildren} from "./components/AppChildren"
import {createRoot} from 'react-dom/client';

const container = document.getElementById('app');
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'children',
                element: <AppChildren />
            }
        ],

    },
    {
        path: 'about',
        element: <About />
    },
    {
        path: 'game',
        element: <Grid />
    },

])


const root = createRoot(container);
root.render(

        <RouterProvider router={router}/>

);