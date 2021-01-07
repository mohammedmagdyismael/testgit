import styled from 'styled-components'

export const Container = styled.div`
    font-family: sans-serif;
    font-size: 14px;
`;
export const Panel = styled.div``;
export const XMLCode = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;
export const Btn = styled.div`
    width: 140px;
    text-align: center;
    padding: 1px 10px;
    background-color: #015cac;
    color: #fff;
    font-family: sans-serif;
    font-size: 14px;
    margin: 40px auto;
    cursor: pointer;

`;

export const AddBtn = styled(Btn) `
    margin: 0px 10px;
    width: 75px;
    padding: 1px 4px;
`;
export const Wrapper = styled.div`
    display: flex;
`;