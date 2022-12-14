import React from 'react';
import Calendar from './app/components/RoomView';
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

    return (component)
}

export default App;
