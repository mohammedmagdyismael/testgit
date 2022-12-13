import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px 45px 0px;
`;

export const ResultMovieCard = styled.div`
    display: inline-flex;
    flex-direction : column;
    flex-wrap : wrap;
    margin: auto;
    box-shadow: 0 1px 1px rgba(0,0,0,0.15);
    background-color:white;
    border: 1px solid #efefef;
    border-radius: 4px;
`;

export const ResultMovieNameLink = styled.a`
    display : block;
    font-family: "Lato", sans-serif;
    text-decoration: none;
    font-style: unset;
    font-size: 15px;
    font-weight: 600;
    color: black;
    border: 0.5px 0.5px 0.5px 0.5px;
    width: fit-content;
    margin: 0px 0px 0px 8px;
    margin-right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 12ch;
`;

export const ResultMovieYear = styled.p`
display : block;
    color: #9e9e9e;
    margin-top: 0.5px;
    margin-left: 8px;
    margin-bottom: 0.5px;
    margin-right: 0.5px;
    padding-right: 8px;
    width: fit-content;
    font-family: 'Lato', sans-serif ;
    font-size : 13px;
`;

export const PlaceholderImg = styled.img`
    display : block;
    height: 140px;
`;

export const EmptyStateMsg = styled.p`
    display : block;
    font-size : 20px;
    width: 100%;
    text-align: center;
    margin-top:20%;
    margin-bottom:10%;
`;
export const EmptyStateMsgContainer = styled.div`
    width: 100%;
    align : center;
`;