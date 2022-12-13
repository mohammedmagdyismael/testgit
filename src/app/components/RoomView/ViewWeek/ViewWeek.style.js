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
export const MonthRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const DayName = styled.p`
    margin: 0px;
    width: 15%;
    text-align: left;
`;

export const DayNumber = styled(DayName)`
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

export const MonthRowItem = styled.div``;

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
    height: 100px;
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
    border: 1px solid #fff;
    background-color: #e7e7e76b;
    cursor: pointer;
    &:hover {
        color: #fff;
        background-color: #0A66C2;
    }
`;

export const DimmedSlot = styled.div`
    height: 110px;
    border: 1px solid #fff;
    background-color: #e7e7e76b;

`;

export const WeekColumn = styled.div`
    width: 200px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
`;
export const ButtonContainer = styled.div`
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    background-color: #dfdfdf;
    width: 70px;
    margin: 0px 3px;
    height: 30px;
    &>p {
        margin: 7px 0px;
        text-align: center;
    }
`;

export const AppointmentSlot = styled.div`
    border: 1px solid #ff0909;
    font-size: 14px;
    line-height: 22px;
    padding: 0px 5px;
    border-left: 7px solid #ff0909;
    position: absolute;
    top: ${props => `${props.slotPosition}px`};
    width: 90%;
    height: ${props => props.slotHeight ? `${props.slotHeight}px` : ''};
    &>p{
        margin: 0px;
    }
`;