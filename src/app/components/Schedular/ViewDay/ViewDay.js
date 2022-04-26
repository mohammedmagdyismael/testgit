import React from 'react'
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
import { getNumberOfDaysInMonth, getMonthDays } from './ViewDay.helper';

const ViewYear = ({ monthIndex, defaultYear, day }) => {
    const renderMonths = () => {
        const monthList = [];
        const numberOfDays = getNumberOfDaysInMonth(defaultYear, monthIndex);
        const days = getMonthDays(numberOfDays);
        const dayIndexInWeek = new Date(`${defaultYear}-${monthIndex}-${day}`).getDay();

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
                    <div style={{ width: '100%'}}>
                        <MonthRow>
                             
                                <WeekColumn>
                                    <DayName>{daysNames[dayIndexInWeek]}</DayName>
                                    <DaysContainer>{days[day - 1]}</DaysContainer>
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