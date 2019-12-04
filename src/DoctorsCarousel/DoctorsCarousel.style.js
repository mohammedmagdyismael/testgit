import styled from 'styled-components'


  
export const ItemImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%; 
`;

 export const GalleryContainer = styled.div`
    display: inline-block; 
 `;

export const Container = styled.div`
::-webkit-scrollbar { 
        display: none; 
      }
      width: 336px;
    height: 150px;
  border-radius: 5px;

  position: relative;
  margin: auto;
  display: flex; 
   
  scroll-snap-type: y mandatory;

  flex-direction: row-reverse; 
    overflow: hidden;  
    flex: 1;
    scroll-snap-align: start;
 
    flex-shrink: 0; 
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;  

`;


export const ItemContainer = styled.div`
 
   scroll-snap-align: start;
   display: ${props=>props.small ? 'inline-block' : 'flex'};;
   flex-direction: column;  
   margin: 0px 5px 0px 5px;
	height: 146px;
	width: 102px;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.13);
 
    cursor : pointer;
    transform : ${props=> `translateX(${props.displacement}%)`};
    transition : transform 0.5s;
  
    flex-shrink: 0;
     
    transform-origin: center center;
    position: relative; 
    justify-content: center;
    align-items: center;
`;

export const DrName = styled.p`
 
	 
	color: #0070CD;
	font-family: sans-serif;
	font-size: 10px;
	font-weight: 600;
	line-height: 13px;
	text-align: center;
   margin: 5px;
 `;

export const Speciality = styled.p`
   margin: 0;
	color: #808184;
	font-family: sans-serif;
	font-size: 8px;
	line-height: 10px;
	text-align: center;
`;

export const NumberofReviews = styled.p`
	color: #808184;
	font-family: sans-serif;
	font-size: 8px;
	line-height: 10px;
	text-align: center;
`;

export const SideIndicator = styled.div`
   

   cursor: pointer;
  width: 20px;
    height: 20px;
    position: absolute; 
    top: 40%;
    z-index: 2;
    border-style: solid;
    border-width: 1px;
    border-color: #9C9DA0;
    border-radius: 5px; 
`;

export const IndicatorCaret = styled.span`
    position: relative;
    color: #9C9DA0;
    font-size: 15px;
    top: 0px;
    left: 5px;
    `;