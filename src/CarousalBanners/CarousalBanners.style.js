import styled from 'styled-components'


  
export const ItemImage = styled.img`
  width : 100%;
  border-radius: 5px 5px 0px 0px;
  height: ${props=>props.small ? '60px' : ''}; 
`;

export const ItemContainer = styled.div`
   scroll-snap-align: start;
    display: ${props=>props.small ? 'inline-block' : 'flex'};;
    flex-direction: column; 
    border-radius: 5px;
    box-shadow: 0px 2px 2px 0px #dcdada;
    margin: 0px 0px 0px 0px;
    width: 100%;
    height: 195px;
    cursor : pointer;
    transform : ${props=> `translateX(${props.displacement}%)`};
    transition : transform 0.5s;
  
    flex-shrink: 0;
     
    transform-origin: center center;
 
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
    position: relative;
    margin: auto;
    display: flex; 
   
    -ms-scroll-snap-type: mandatory;
  /* Forces a snap scroll behavior on your images. */
  
  -ms-scroll-snap-points-x: snapInterval(0%, 100%);
  /* Defines the y and x intervals to snap to when scrolling. */

    flex-direction: row-reverse; 
    overflow: auto;  
    flex: 1;
    scroll-snap-align: start;
 
    flex-shrink: 0;
    width: 100%;
    height: 195px;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
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
  
  top: 50%;
  

    cursor: pointer;
    position: absolute;
    top: 40%;
    width: auto;
    padding: 16px;
    margin-top: -50px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    border-radius: 0 3px 3px 0;
    user-select: none;
    -webkit-user-select: none;
`;
export const LButton = styled(RButton)`
  right: 8px;
  border-radius: 3px 0 0 3px;
`;

 
export const SliderWrap = styled.div`
  width: 100%;
  height: 500px;
  position: absolute;
  /* left: 50%; */
  /* margin-left: -150px; */
  top: 50%;
  margin-top: -225px;
`
export const Slider = styled.div`
width: 100%;
  height: 100%;
  overflow: hidden;
  /* ::ms-touch */
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  /* Hides the scrollbar. */
  -ms-scroll-chaining: none;
  /* Prevents Metro from swiping to the next tab or app. */
  -ms-scroll-snap-type: mandatory;
  /* Forces a snap scroll behavior on your images. */
  -ms-scroll-snap-points-x: snapInterval(0%, 100%);
  /* Defines the y and x intervals to snap to when scrolling. */ 
`
export const Holder = styled.div`
  width : 100%
`
 