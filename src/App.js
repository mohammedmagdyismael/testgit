import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Resume from 'views/Resume';

import Layout from 'app/layout';
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

    return (
        <Layout headers={headers}>    
            <BrowserRouter>
                <Routes>
                <Route exact path="/" element={<Resume />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App;
