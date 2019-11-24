import styled from 'styled-components'

  
export const Container = styled.ul`
   font-size: 19px;
  list-style : none;
  font-weight: 400;
  font-style: normal;
  font-family: TheSans;
  box-sizing: border-box;
  text-align: center;
  line-height: 1.428571429;
  `;

  export const Item = styled.li` 
    cursor :pointer;
    display : inline-block;
    background-color : #0070cd;
    color : #fff;
    border: 1px solid #d1d1d1;
    border-radius: 4px!important;
    font-size: 15px; 
    line-height: 40px;
    font-weight: 400;
    margin-left: 2px!important;
    margin-right: 2px!important;
    padding : 10px;
    width : 40px;
    height : 40px;
  `
  
  export const Fullrange = styled.div` 
    padding : 0.5px;
    width : 100%;
    margin : 0.5px;
  `;
  
  export const Movingrange = styled.div`
    display : block;
    width : 100px;
    height : 17px;
    background-color : red;
    background-image: linear-gradient(to right, lightgreen , green );
  `;