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
    ButtonsContainer,
    ButtonContainer,
} from './ViewYear.style';

import { daysNamesAbbrev, monthsNames, NUMBER_MONTHS, data } from '../constants';

const ViewYear = ({ onClickMonth }) => {
    const [defaultYear, setDefaultYear] = useState(2021);
    const setNextYear = () => setDefaultYear(defaultYear + 1);
    const setPrevYear = () => setDefaultYear(defaultYear - 1);

    const renderMonths = () => {
        const monthList = [];
        const getNumberOfDaysInMonth = monthIndex => {
            return new Date(defaultYear, monthIndex, 0).getDate();
        };

        const getShiftLeadingDays = monthIndex => {
            const indexOfFirstDayInMonth = new Date(`${defaultYear}-${monthIndex}-01`).getDay();
            const shiftedDays = [];
            for (let i = 0; i < indexOfFirstDayInMonth; i++) {
                const shiftedDay = (
                    <DayNumber>{''}</DayNumber>
                )
                shiftedDays.push(shiftedDay);
            }
            return shiftedDays;
        }

        for (let i = 0; i < NUMBER_MONTHS; i++) {
            const numberOfDays = getNumberOfDaysInMonth(i+1);
            const numberOfShiftedDays = getShiftLeadingDays(i+1);
            const days = [];
            for (let j = 0; j < numberOfDays; j++) {
                const day = (
                        <DayNumber hasData={
                            data[defaultYear] &&
                            data[defaultYear][i + 1] &&
                            data[defaultYear][i + 1][j + 1] &&
                            data[defaultYear][i + 1][j + 1].length > 0
                        }>{j+1}</DayNumber>
                    
                )
                days.push(day);
            }

            const totalShiftsAndDays = [...numberOfShiftedDays, ...days];

            const month = (
                <MonthContainer onClick={() => onClickMonth(defaultYear, i+1)}>
                    <MonthName>{monthsNames[i]}</MonthName>
                    <MonthRow>
                        {daysNamesAbbrev.map(dayName => <DayName>{dayName}</DayName>)}
                    </MonthRow>
                    <DaysContainer>
                        {totalShiftsAndDays}
                    </DaysContainer> 
                </MonthContainer>
            );
            monthList.push(month);
        }
        return monthList;
    }

    return (
        <YearContainer>
            <div style={{ dispaly: 'flex' }}>
                <YearName>{defaultYear}</YearName>
                <ButtonsContainer>
                    <ButtonContainer onClick={() => setPrevYear()}>
                        <p>Prev</p>
                    </ButtonContainer>
                    <ButtonContainer onClick={() => setNextYear()}>
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