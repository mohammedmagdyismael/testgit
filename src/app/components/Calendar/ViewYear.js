import React, { useState } from 'react'
import { 
    Container, 
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
    MonthsWrapper,
    MonthNameContainer,
    MonthNameWrapper,
    DaysViewHeaderContainer,
    ShiftedDay,
    YearNameContainer,
    YearNameWrapper,
} from './ViewYear.style';
import { daysNamesAbbrev, monthsNames, NUMBER_MONTHS, data } from './constants';

const CALENDAR_VIEWS = {
    YEARS: 0,
    MONTHS: 1,
    DAYS: 2,
}


const DISABLE_THIS_DAYS = ['12/1/2021', '12/15/2021', '12/22/2021']

const ViewYear = () => {
    const [viewIndex, setViewIndex] = useState(CALENDAR_VIEWS.DAYS);
    const [defaultYear, setDefaultYear] = useState(new Date().getFullYear());
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

    const onDayClick = day => {
        console.log(`${monthIndex+1}/${day}/${defaultYear}`, "MM/DD/YYYY")
    };

    const onMonthInMonthViewClick = index => {
        setMonthIndex(index);
        setViewIndex(CALENDAR_VIEWS.DAYS);
    };

    const onMonthInDaysViewClick = index => {
        setViewIndex(CALENDAR_VIEWS.MONTHS);
    };

    const setNextMonth = () => {
        if (monthIndex < NUMBER_MONTHS - 1) {
            setMonthIndex(monthIndex + 1)
        } else {
            setDefaultYear(defaultYear + 1)
            setMonthIndex(0)
        }
    };

    const setPrevMonth = () => {
        if (monthIndex > 0) {
            setMonthIndex(monthIndex - 1)
        } else {
            setDefaultYear(defaultYear - 1)
            setMonthIndex(NUMBER_MONTHS - 1)
        }
    };

    const onYearInDaysViewClick = () => {
        setViewIndex(CALENDAR_VIEWS.YEARS);
    }

    const renderDays = () => {

        const getNumberOfDaysInMonth = monthIndex => {
            return new Date(defaultYear, monthIndex, 0).getDate();
        };

        const getShiftLeadingDays = monthIndex => {
            const indexOfFirstDayInMonth = new Date(`${defaultYear}-${monthIndex}-01`).getDay();
            const shiftedDays = [];
            for (let i = 0; i < indexOfFirstDayInMonth; i++) {
                const shiftedDay = (
                    <ShiftedDay>{''}</ShiftedDay>
                )
                shiftedDays.push(shiftedDay);
            }
            return shiftedDays;
        }
        const numberOfDays = getNumberOfDaysInMonth(monthIndex+1);
        const numberOfShiftedDays = getShiftLeadingDays(monthIndex+1);
        const days = [];
        for (let j = 0; j < numberOfDays; j++) {
            const isDisabledDay = DISABLE_THIS_DAYS.includes(`${monthIndex+1}/${j+1}/${defaultYear}`);
            const toDay = new Date().toLocaleString().split(',')[0];
            const isToDay = toDay === `${monthIndex+1}/${j+1}/${defaultYear}`;
            const day = (
                    <DayNumber 
                        isDisabled={isDisabledDay} 
                        onClick={() => { if (!isDisabledDay) onDayClick(j+1)}} 
                        isToDay={isToDay}>{j+1}</DayNumber>
                
            )
            days.push(day);
        }

        const totalShiftsAndDays = [...numberOfShiftedDays, ...days];

        const month = (
            <Container>
                <ButtonsContainer>
                    <ButtonContainer onClick={() => setPrevMonth()}>
                        <p>{'<'}</p>
                    </ButtonContainer>
                    <DaysViewHeaderContainer>
                        <MonthName onClick={() => onMonthInDaysViewClick()}>{monthsNames[monthIndex]}</MonthName>
                        <YearName onClick={() => onYearInDaysViewClick()}>{defaultYear}</YearName>
                    </DaysViewHeaderContainer>
                    <ButtonContainer onClick={() => setNextMonth()}>
                        <p>{'>'}</p>
                    </ButtonContainer>
                </ButtonsContainer>
                <MonthRow>
                    {daysNamesAbbrev.map(dayName => <DayName>{dayName}</DayName>)}
                </MonthRow>
                <DaysContainer>
                    {totalShiftsAndDays}
                </DaysContainer> 
            </Container>
            );
   
        return month;
    }

    const renderMonths = () => (
        <Container>
            <MonthsWrapper>
                {monthsNames.map((monthName, idx) => (
                    <MonthNameContainer isSelected={monthIndex === idx} onClick={() => onMonthInMonthViewClick(idx)}>
                        <MonthNameWrapper>
                            <p style={{ margin: '0px' }}>{monthName.slice(0,3)}</p>
                        </MonthNameWrapper>
                    </MonthNameContainer>
                ))}
            </MonthsWrapper>
        </Container>
    );

    const onYearInYearsViewClick = year => {
        setDefaultYear(year);
        setViewIndex(CALENDAR_VIEWS.MONTHS);
    }

    

    const renderYears = () => {
        const years = [];
        for(let i = new Date().getFullYear() - 5; i < new Date().getFullYear() + 7; i++) {
            years.push(
                <YearNameContainer isSelected={defaultYear === i} onClick={() => onYearInYearsViewClick(i)}>
                        <YearNameWrapper>
                            <p style={{ margin: '0px' }}>{i}</p>
                        </YearNameWrapper>
                </YearNameContainer>
            )
          }

        return(
        <Container>
            <MonthsWrapper>
                {years}
            </MonthsWrapper>
        </Container>
        )
    }

    return (
        <YearContainer>
            <MonthsContainer>
                {CALENDAR_VIEWS.YEARS === viewIndex && renderYears()}
                {CALENDAR_VIEWS.MONTHS === viewIndex && renderMonths()}
                {CALENDAR_VIEWS.DAYS === viewIndex && renderDays()}
            </MonthsContainer>
            
        </YearContainer>
    )
}

export default ViewYear;