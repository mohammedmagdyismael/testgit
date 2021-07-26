import React, { useState } from 'react'
import { 
    MonthContainer, 
    MonthRow,
    YearContainer, 
    MonthName, 
    DayName, 
    DayNumber, 
    DaysContainer, 
    MonthsContainer, 
    YearName,
    DayContainer,
    ShiftDayContainer,
    ButtonContainer,
    ButtonsContainer,
    AppointmentSlot,
} from './ViewMonth.style';

import { daysNames, monthsNames, data } from '../constants';

const ViewYear = ({ monthIndex, defaultYear }) => {

    const [currentMonth, setMonth] = useState(monthIndex);
    console.log({ currentMonth })
    const renderMonths = () => {
        const monthList = [];

        const getNumberOfDaysInMonth = month => {
            return new Date(defaultYear, month, 0).getDate();
        };

        const getShiftLeadingDays = month => {
            const indexOfFirstDayInMonth = new Date(`${defaultYear}-${month}-01`).getDay();
            const shiftedDays = [];
            for (let i = 0; i < indexOfFirstDayInMonth; i++) {
                const shiftedDay = (
                    <ShiftDayContainer><DayNumber>{''}</DayNumber></ShiftDayContainer>
                )
                shiftedDays.push(shiftedDay);
            }
            return shiftedDays;
        }

        const numberOfDays = getNumberOfDaysInMonth(currentMonth);
        const numberOfShiftedDays = getShiftLeadingDays(currentMonth);
        
        const days = [];
        for (let j = 0; j < numberOfDays; j++) {

            const day = (
            <DayContainer>
                <DayNumber
                hasData={
                    data[defaultYear] &&
                    data[defaultYear][currentMonth] &&
                    data[defaultYear][currentMonth][j + 1] &&
                    data[defaultYear][currentMonth][j + 1].length > 0
                }
                >{j+1}</DayNumber>
                {
                    data[defaultYear] &&
                    data[defaultYear][currentMonth] &&
                    data[defaultYear][currentMonth][j + 1] &&
                    data[defaultYear][currentMonth][j + 1].length &&
                    data[defaultYear][currentMonth][j + 1].map(appointment => 
                        <AppointmentSlot>
                            <p>{`${appointment.id}: ${appointment.appointment}`}</p>
                        </AppointmentSlot>
                        )
                }
            </DayContainer>);
            days.push(day);
        }

        const totalShiftsAndDays = [...numberOfShiftedDays, ...days];

        const month = (
            <MonthContainer>
                <MonthName>{monthsNames[currentMonth - 1]}</MonthName>
                <MonthRow>
                    {daysNames.map(dayName => <DayName>{dayName}</DayName>)}
                </MonthRow>
                <DaysContainer>
                    {totalShiftsAndDays}
                </DaysContainer> 
            </MonthContainer>
        );
        monthList.push(month);
        
        return monthList;
    }

    const setPrevMonth = () => currentMonth !== 1 && setMonth(currentMonth - 1);
    const setNextMonth = () => currentMonth !== 12 && setMonth(currentMonth + 1);

    return (
        <YearContainer>
            <div style={{ dispaly: 'flex' }}>
                <YearName>{defaultYear}</YearName>
                <ButtonsContainer>
                    <ButtonContainer onClick={() => setPrevMonth()}>
                        <p>Prev</p>
                    </ButtonContainer>
                    <ButtonContainer onClick={() => setNextMonth()}>
                        <p>Next</p>
                    </ButtonContainer>
                </ButtonsContainer>
            </div>
            <MonthsContainer>
                {renderMonths()}
            </MonthsContainer>
            
        </YearContainer>
    )
}

export default ViewYear;