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
    width: 205px;
    text-align: left;
`;

export const DayNumber = styled(DayName)`
    margin: 6px 6px;
    width: 28px;

    height: 28px;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    border-radius: 50%;
    font-weight: ${props => props.hasData && '600'};
    background-color: ${props => props.hasData && 'red'};
    color: ${props => props.hasData && 'white'};
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
    width: 203px;
    height: 155px;
    cursor: pointer;
    border: 1px solid #fff;
    background-color: #e7e7e76b;
    &:hover {
        color: #fff;
        background-color: #0A66C2;
    }
`;

export const ShiftDayContainer = styled.div`
    width: 205px;
    height: 155px;
    cursor: unset;
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
    &>p{
        margin: 0px;
    }

`;