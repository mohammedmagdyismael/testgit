import styled from 'styled-components';

export const SwitchButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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