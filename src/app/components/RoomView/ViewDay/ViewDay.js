import React from 'react'
import { 
    MonthContainer, 
    RoomContainer, 
    YearContainer, 
    MonthName, 
    RoomName, 
    DaysContainer, 
    MonthsContainer, 
    YearName,
    WeekTableHeader,
    WeekTableShift,
    HourSlotLabel,
    Slot,
    WeekColumn,
    RoomsContainer,
    RoomNameContainer,
    AppointmentSlot,
} from './ViewDay.style';
import { daysNames, monthsNames, daySlots } from '../constants'
import { getNumberOfDaysInMonth, getMonthDays } from './ViewDay.helper';

const ViewYear = ({ monthIndex, defaultYear, day }) => {
    const renderMonths = () => {
        const monthList = [];
        const numberOfDays = getNumberOfDaysInMonth(defaultYear, monthIndex);
        const days = getMonthDays(numberOfDays);
        const dayIndexInWeek = new Date(`${defaultYear}-${monthIndex}-${day}`).getDay();

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

        // Rooms
        const Rooms = ['Room1', 'Room2', 'Room3', 'Room4', 'Room5',
         'Room6', 'Room7', 'Room8', 'Room9', 'Room10', 'Room11', 'Room12', 'Room13']

         const data = [{
            id: 123,
            appointment: "Test",
            from: '2021-01-01T01:45:00',
            to: '2021-01-01T03:30:00'
        }];

        const month = (
            <MonthContainer>
                <WeekTableHeader>
                    {/** Time Line */}
                    <div>
                        <WeekTableShift />
                        {
                        daySlots.map(slot =>
                            <HourSlotLabel>{slot}</HourSlotLabel>
                            )
                        }
                    </div>
                    {/** Rooms */}
                    <div style={{ width: '100%'}}>
                        <RoomsContainer>
                            {Rooms.map(room => 
                                <RoomContainer>
                                <WeekColumn>
                                    <RoomNameContainer>
                                        <RoomName>{room}</RoomName>
                                    </RoomNameContainer>
                                    <div style={{ position: 'relative'}}>
                                    {
                                    daySlots.map(slot =>
                                        <Slot id={slot}>
                                            <p>{" "}</p>
                                        </Slot>
                                        )
                                    }
                                    {   data.map(appointment => {
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
                                
                        </RoomContainer>
                        )}
                            
                        </RoomsContainer>
                    </div>
                </WeekTableHeader>
            </MonthContainer>
        );
        monthList.push(month);
        return monthList;
    }

    return (
        <YearContainer>
            <MonthsContainer>
                {renderMonths()}
            </MonthsContainer>
        </YearContainer>
    )
}

export default ViewYear;