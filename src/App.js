import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from 'app/layout';
import Calendar from './views/TraktMovies';

import './App.css'

const App = ({ ...props }) => {

    const headers = [
        {
            index: 0,
            name: 'Tab 0',
            link: ''
        },
        {
            index: 1,
            name: 'Tab 1',
            link: ''
        },
        {
            index: 2,
            name: 'Tab 2',
            link: ''
        },
    ];

    const component = <Calendar />

    return (
        <BrowserRouter>
                <Routes>
                <Route exact path="/" element={component} />
                </Routes>
            </BrowserRouter>
    )
}

export default App;
