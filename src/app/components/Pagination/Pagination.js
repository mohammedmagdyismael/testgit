import React from 'react'
import {Container,Item} from './Pagination.style'

class NavigatableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            navCounterCurrent : 0,
            navCounterPrev : 2,
            selected : false
        }
    }

    componentDidMount(){
        new Array(5).map((i)=>console.log(i))        

    }
    render(){
        return(
            <div >
                <Container>
                    <Item   id='list'><a className = 'x' href="#">First ink</a></Item> 
                </Container>
                
            </div>
        )
    }
}
export default NavigatableList