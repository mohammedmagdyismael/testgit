import styled from 'styled-components';

export const YearContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MonthsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;


export const MonthContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px 20px;
    padding: 8px 8px;
    font-family: sans-serif;
`;
export const RoomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    min-width: 185px;
`;

export const RoomName = styled.p`
    margin: 0px;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
`;

export const RoomNameContainer = styled.div`
    padding: 8px 0px;   
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const DayNumber = styled(RoomName)`
    margin: 6px 6px;
    width: 28px;
`;

export const MonthName = styled.p`
    margin: 0px;
    margin-bottom: 10px;
`;

export const DaysContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
`;

export const RoomContainerItem = styled.div``;

export const YearName = styled.p`
    font-size: 28px;
    font-family: sans-serif;
    font-weight: 900;
    margin: 0px 25px;
`;

export const DayContainer = styled.div`
    width: 205px;
    height: 80px;    
    font-size: 22px;
    font-weight: 600;
`;

export const ShiftDayContainer = styled(DayContainer)``;

export const WeekTableHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

export const WeekTableShift = styled.div`
    width: 65px;
    height: 57px;
`;

export const HourSlotLabel = styled.p`
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    margin: 0px;
    height: 112px;
`; 

export const HourlyRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 150px;
`;

export const Slot = styled.div`
    height: 110px;
    border: 1px solid #e7e7e76b;
    background-color: #ffff;
    cursor: pointer;
    &:hover {
        color: #fff;
        background-color: #e7e7e76b;
    }
`;

export const WeekColumn = styled.div`
    width: 100%;
`;

export const RoomsContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow: auto;
`;

export const AppointmentSlot = styled.div`
    padding: 4px 4px 4px 12px;
    gap: 12px;
    position: absolute;
    width: 162px;
    background: #14B61B;
    border-radius: 8px;
    color: #fff;

    font-size: 14px;
    line-height: 22px;
    top: ${props => `${props.slotPosition}px`};
    width: 85%;
    height: ${props => props.slotHeight ? `${props.slotHeight}px` : ''};
    &>p{
        margin: 0px;
    }
`;