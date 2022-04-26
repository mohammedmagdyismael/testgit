import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    margin: 0 auto;
    .container {
        display: flex;
        flex-direction: column;
        width: 595px;
        margin: 0 auto;
        justify-content: space-between;
        // display: none;
    }
    .details-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .details {
        display: flex;
        flex-direction: column;
    }
    .bold-title {
        font-weight: bold;
        font-size: 11px;
        line-height: 18px;
        align-items: center;
        text-align: center;
        color: #000000;
        text-align: left;
        margin: 0;
        font-family: sans-serif;
    }
    .light-detail {
        font-size: 11px;
        line-height: 18px;
        align-items: center;
        text-align: center;
        color: #000000;
        text-align: left;
        margin: 0;
        font-family: sans-serif;
    }
    .table-item {
        width: 16%;
    }
    .table-first-item {
        text-align: left;
    }
    .table-middle-item {
        text-align: left;
    }
    .table-last-item {
        text-align: right;
    }
    
    .table-container {
        margin-bottom: 100px;
    }
    .table-header {
        display: flex;
        justify-content: space-between;
    }
    .bold-separator {
        border: 2px solid;
        border-width: 2px 0px 0px 0px;
        margin: 8px 0px
    }
    .table-row {
        display: flex;
        justify-content: space-between;
    }
    .summary-container {
        display: flex;
        justify-content: flex-end;
    }
    .summary-wrapper {
        width: 50%;
    }
    .summary-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .bold-title-big {
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        align-items: center;
        text-align: center;
        color: #000000;
        text-align: left;
        margin: 0;
        font-family: sans-serif;
    }
    .bold-invoice-title {
        font-family: sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 28px;
        display: flex;
        align-items: center;
        color: #000000;
    }
`;

export const Image = styled.img`
    width: 135px;
    margin: 0 auto;
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 8px;
    width: fit-content;
    margin: 0 auto;
`;
export const BigText = styled.p`
    & #textX {
        margin: 0px;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: red;
    }
`;
export const MediumText = styled(BigText)`
    font-size: 25px;
    font-weight: bold;
    color: blue;
`;
export const SmallText = styled(BigText)`
    font-size: 12px;
    font-weight: bold;
    color: #64a310;
`;

export const PrintLink = styled.p`
    cursor: pointer;
    margin: 25px 0px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;