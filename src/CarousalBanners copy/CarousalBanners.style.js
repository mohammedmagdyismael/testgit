import styled from 'styled-components'


  
export const ItemImage = styled.img`
  width : 100%;
  border-radius: 5px 5px 0px 0px;
  height: ${props=>props.small ? '60px' : ''};
  /* width: ${props=>props.small ? '75px' : '550px'}; */
`;

export const ItemContainer = styled.div`
   scroll-snap-align: start;
    display: flex;
    flex-direction: column; 
    border-radius: 5px;
    box-shadow: 0px 2px 2px 0px #dcdada;
    margin: 0px 0px 0px 0px;
    height: ${props=>props.small ? '82px' : ''};
    cursor : pointer;
    transform : ${props=> `translateX(${props.displacement}%)`};
    transition : transform 0.5s;
  
    flex-shrink: 0;
    width: 100%;
    height: 300px; 
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative; 
    justify-content: center;
    align-items: center;
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
 width: 100%;
  position: relative;
  margin: auto;
  display: flex; 
   
  scroll-snap-type: y mandatory;

  flex-direction: row-reverse; 
    overflow: auto;  
    flex: 1;
    scroll-snap-align: start;
 
    flex-shrink: 0;
    width: 100%;
    height: 300px; 
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative; 
    justify-content: center;
    align-items: center;

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

export const RButton = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  background-color: #ffffff5c;
`;
export const LButton = styled(RButton)`
  right: 8px;
  border-radius: 3px 0 0 3px;
`;

 