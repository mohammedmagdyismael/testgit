import styled from 'styled-components'


  
export const ItemImage = styled.img`
  border-radius: 5px 5px 0px 0px;
  height: ${props=>props.small ? '60px' : ''};
  width: ${props=>props.small ? '75px' : '150px'};
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: column; 
    border-radius: 5px;
    box-shadow: 0px 2px 2px 0px #dcdada;
    margin: 3px;
    height: ${props=>props.small ? '82px' : ''};
    cursor : pointer;
`;

export const ItemTitle = styled.p`
    text-align: center;
    font-family: sans-serif;
    line-height: ${props=>props.small ? '22px' : '25px'};
    margin: 0px;
    font-size: ${props=>props.small ? '12px' : '14px'};
    color: #616161;
`;

export const Container = styled.div`
::-webkit-scrollbar { 
        display: none; 
      }
  display: flex; 

  height: auto;
  display: flex;
  flex-wrap: wrap;

  flex-direction: row;
    display: flex;
    overflow: auto;
    /* overflow: hidden; */
    /* width: 194px; */
    height: 176px;
    flex: 1;

`;

export const SmallItems = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;

  flex-direction: column;
    display: flex; 
    height: 176px;
    flex: 1;
`;
