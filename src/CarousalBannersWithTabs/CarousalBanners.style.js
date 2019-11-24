import styled from 'styled-components'


  
export const ItemImage = styled.img`
  width : 100%;
  border-radius: 5px;
  height: ${props=>props.small ? '82px' : '100%'};
  /* width: ${props=>props.small ? '75px' : '550px'}; */
`;

 export const GalleryContainer = styled.div`
    display: inline-block; 
 `;

export const Container = styled.div`
::-webkit-scrollbar { 
        display: none; 
      }
  width: 652px;
  height: 397px;
  border-radius: 5px;

  position: relative;
  margin: auto;
  display: flex; 
   
  scroll-snap-type: y mandatory;

  flex-direction: row-reverse; 
    overflow: auto;  
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
    border-radius: 10px;
    box-shadow: 0px 2px 2px 0px #dcdada;
    margin: 0px 0px 0px 0px;
    height: ${props=>props.small ? '60px' : '100%' };
    width: ${props=>props.small ? '60px':'100%' };
    cursor : pointer;
    transform : ${props=> `translateX(${props.displacement}%)`};
    transition : transform 0.5s;
  
    flex-shrink: 0;
     
    transform-origin: center center;
 
    position: relative; 
    justify-content: center;
    align-items: center;
`;

 export const GalleryTabs = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 100px;
    padding: 10px 0px 0px 0px;
 `;

 export const Tab = styled.div`
    display: inline-block;
    width: 155px;
    height: 82px;
    border-radius: 5px;
    margin: 0px 5px;

    border: ${props=>props.active ? 'solid 1px #0070cd' : 'solid 1px #fff'} ;
    padding: ${props=>props.active ? '1px' : '1px'} ;
 `;