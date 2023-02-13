import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import {App} from "./components/App"
import {About} from "./components/About"
import {createRoot} from 'react-dom/client';

const container = document.getElementById('app');
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: 'about',
        element: <About />
    }
])


const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);