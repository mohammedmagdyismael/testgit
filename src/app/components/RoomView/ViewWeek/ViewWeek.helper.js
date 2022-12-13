import React from 'react';
import { ShiftDayContainer, DayNumber, DayContainer } from './ViewWeek.style';

export const getNumberOfDaysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex, 0).getDate();
};

export const getShiftLeadingDays = (year, monthIndex) => {
    const indexOfFirstDayInMonth = new Date(`${year}-${monthIndex}-01`).getDay();
    const shiftedDays = [];
    for (let i = 0; i < indexOfFirstDayInMonth; i++) {
        const shiftedDay = (
            <ShiftDayContainer><DayNumber>{''}</DayNumber></ShiftDayContainer>
        )
        shiftedDays.push(shiftedDay);
    }
    return shiftedDays;
};

export const getMonthDays = numberOfDays => {
    const days = [];
    for (let j = 0; j < numberOfDays; j++) {
        const day = (<DayContainer><DayNumber>{j+1}</DayNumber></DayContainer>);
        days.push(day);
    }
    return days;
};
