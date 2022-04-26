import styled from 'styled-components';

export const Container = styled.div``;

export const Wrapper = styled.div``;

export const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const TabName = styled.p`
    font-size: 19px;
    color: #ffff;
    text-align: center;
    margin: auto 16px;
`;

export const TabWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 5px solid #fff0;
    &:hover {
        border-bottom: 5px solid #33B4D1;
    }
`;

export const TabContainer = styled.a`
    width: 205px;
    cursor: pointer;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
`;

export const LogoImage = styled.img`
    width: 45px;
    height: 45px;
    margin: auto 0;
`;

export const TabContent = styled.div`
    display: flex;
    justify-content: center;
`;