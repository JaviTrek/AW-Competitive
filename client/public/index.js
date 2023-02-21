import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import {Template} from "./components/Template"
import {App} from "./components/App"
import {Grid} from "./components/grid/Grid"
import {About} from "./components/About"
import {AppChildren} from "./components/AppChildren"
import {createRoot} from 'react-dom/client';

const container = document.getElementById('app');
const router = createBrowserRouter([
    {
        path: '/',
        element: <Template/>,
        children: [
            {
                name: 'App',
                path: '/',
                element: <App />,
            },
            {
                name: 'children',
                path: 'children',
                element: <AppChildren />
            },
            {
                name: 'about',
                path: 'about',
                element: <About />
            },
            {
                name: 'game',
                path: 'game',
                element: <Grid />
            },
        ],
    },
    

])


const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);