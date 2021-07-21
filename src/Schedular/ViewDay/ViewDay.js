import React, { useState } from 'react'
import { 
    MonthContainer, 
    MonthRow, 
    YearContainer, 
    MonthName, 
    DayName, 
    DaysContainer, 
    MonthsContainer, 
    YearName,
    WeekTableHeader,
    WeekTableShift,
    HourSlotLabel,
    Slot,
    WeekColumn,
} from './ViewDay.style';
import { daysNames, monthsNames, daySlots } from '../constants'
import { getNumberOfDaysInMonth, getShiftLeadingDays, getMonthDays } from './ViewDay.helper';

const ViewYear = () => {

    const [numberOfWeeks, setNumberOfWeeks] = useState(0);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    const defaultYear = 2021;
    const renderMonths = () => {
        const monthList = [];
        const monthIndex = 1;
        const numberOfDays = getNumberOfDaysInMonth(defaultYear, monthIndex);
        const numberOfShiftedDays = getShiftLeadingDays(defaultYear, monthIndex);
        const days = getMonthDays(numberOfDays);
        const totalShiftsAndDays = [...numberOfShiftedDays, ...days];
        if (numberOfWeeks === 0) setNumberOfWeeks(Math.ceil(totalShiftsAndDays.length / 7));
        const weekRow = totalShiftsAndDays.slice((currentWeekIndex)*7, (currentWeekIndex+1)*7)

        const dayIndexInWeek = 3;
        const dayNumberInMonth = 21;

        const month = (
            <MonthContainer>
                <MonthName>{monthsNames[monthIndex - 1]}</MonthName>
                <WeekTableHeader>
                    <div>
                        <WeekTableShift />
                        {
                        daySlots.map(slot =>
                            <HourSlotLabel>{slot}</HourSlotLabel>
                            )
                        }
                    </div>
                    <div>
                        <MonthRow>
                             
                                <WeekColumn>
                                    <DayName>{daysNames[dayIndexInWeek]}</DayName>
                                    <DaysContainer>{weekRow[5]}</DaysContainer>
                                    {
                                    daySlots.map(slot =>
                                        <Slot id={slot}>
                                            <p>{" "}</p>
                                        </Slot>
                                        )
                                    }
                                </WeekColumn>
                                
                        </MonthRow>
                    </div>
                </WeekTableHeader>
            </MonthContainer>
        );
        monthList.push(month);
        return monthList;
    }

    return (
        <YearContainer>
            <div>
                <YearName>{defaultYear}</YearName>
            </div>
            <MonthsContainer>
                {renderMonths()}
            </MonthsContainer>
        </YearContainer>
    )
}

export default ViewYear;