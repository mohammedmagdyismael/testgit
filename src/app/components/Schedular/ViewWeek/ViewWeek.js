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
    ButtonsContainer,
    ButtonContainer,
    AppointmentSlot,
} from './ViewWeek.style';
import { daysNames, monthsNames, daySlots, data } from '../constants'
import { getNumberOfDaysInMonth, getShiftLeadingDays, getMonthDays } from './ViewWeek.helper';

const ViewYear = ({ monthIndex, defaultYear }) => {

    const [numberOfWeeks, setNumberOfWeeks] = useState(0);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    const appointmentSlotLengthInPixels = (from, to) => {
        const dayInPixels = 110 * (daySlots.length - 1);
        const DAY_IN_MINUTES = 60 * 24;
        const durationInMinutes = (new Date(to) - new Date(from))/60/1000;
        return Math.floor((durationInMinutes * dayInPixels) / DAY_IN_MINUTES);
    }

    const appointmentSlotPosition = from => {
        const dayInPixels = 110 * (daySlots.length - 1);
        const DAY_IN_SECONDS = 60 * 60 * 24;
        const hour = new Date(from).getHours();
        const minutes = new Date(from).getMinutes();
        const currentTimeIndexInMinutes = ((60 * hour) + minutes) * 60;

        return Math.floor((currentTimeIndexInMinutes * dayInPixels) / DAY_IN_SECONDS) ;
    }

    const renderMonths = () => {
        const monthList = [];
        const numberOfDays = getNumberOfDaysInMonth(defaultYear, monthIndex);
        const numberOfShiftedDays = getShiftLeadingDays(defaultYear, monthIndex);
        const days = getMonthDays(numberOfDays);
        const totalShiftsAndDays = [...numberOfShiftedDays, ...days];
        if (numberOfWeeks === 0) setNumberOfWeeks(Math.ceil(totalShiftsAndDays.length / 7));
        const weekRow = totalShiftsAndDays.slice((currentWeekIndex)*7, (currentWeekIndex+1)*7)



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
                            {daysNames.map((dayName, index) => 
                                <WeekColumn>
                                    <DayName>{dayName}</DayName>
                                    <DaysContainer>{weekRow[index]}</DaysContainer>
                                    <div style={{ position: 'relative'}}>
                                        {
                                        daySlots.map(slot =>
                                            <Slot id={slot}>
                                                <p>{" "}</p>
                                            </Slot>
                                            )
                                        }
                                        {   index - (numberOfShiftedDays.length - 1) > 0 &&
                                            data[defaultYear] &&
                                            data[defaultYear][monthIndex] &&
                                            data[defaultYear][monthIndex][index - (numberOfShiftedDays.length - 1)] &&
                                            data[defaultYear][monthIndex][index - (numberOfShiftedDays.length - 1)].length &&
                                            data[defaultYear][monthIndex][index - (numberOfShiftedDays.length - 1)].map(appointment => {
                                                const durationInPixels = appointmentSlotLengthInPixels(appointment.from, appointment.to);
                                                const slotPosition = appointmentSlotPosition(appointment.from);
                                                return (
                                                    <AppointmentSlot slotHeight={durationInPixels} slotPosition={slotPosition}>
                                                        <p>{`${appointment.id}: ${appointment.appointment}`}</p>
                                                    </AppointmentSlot>
                                                )
                                                }
                                                )
                                        }
                                    </div>
                                </WeekColumn>
                                )}
                        </MonthRow>
                    </div>
                </WeekTableHeader>
            </MonthContainer>
        );
        monthList.push(month);
        return monthList;
    }

    const setPrevWeek = () => setCurrentWeekIndex(currentWeekIndex - 1)
    const setNextWeek = () => setCurrentWeekIndex(currentWeekIndex + 1)

    return (
        <YearContainer>
            <div style={{ dispaly: 'flex' }}>
                <YearName>{defaultYear}</YearName>
                <ButtonsContainer>
                    <ButtonContainer onClick={() => setPrevWeek()}>
                        <p>Prev</p>
                    </ButtonContainer>
                    <ButtonContainer onClick={() => setNextWeek()}>
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