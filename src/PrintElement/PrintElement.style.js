import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    #Image {
        width: 135px;
        margin: 0 auto;
    }

    #Container {
        display: flex;
        flex-direction: column;
        border: 1px solid;
        border-radius: 8px;
        width: fit-content;
        margin: 0 auto;
    }
        
    #BigText {
        margin: 0px;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        color: red;
    }

    #MediumText {
        margin: 0px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: blue;
    }

    #SmallText {
        margin: 0px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #64a310;
    }

    #PrintLink {
        cursor: pointer;
        margin: 25px 0px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    #scroller {
        overflow: auto;
        height: 50px;
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