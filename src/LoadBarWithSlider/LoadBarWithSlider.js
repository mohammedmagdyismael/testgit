import React from 'react'
import {
    Container,
    Fullrange,
    Movingrange
} from './LoadBarWithSlider.style'


class LoadBarWithSlider extends React.Component{

    componentDidMount(){
        var slider = document.getElementById("myRange");  
        slider.oninput = function() {
            let setPercentage = this.value / 100;
            let fullRange = document.getElementsByClassName('fullrange')
            let movingrange = document.getElementsByClassName('movingrange')
            movingrange[0].style.width = `${fullRange[0].offsetWidth * setPercentage}px` 
        }
    }
    render(){
        return(
            <div >
                <Container>
                    <Fullrange className='fullrange'>
                        <Movingrange className='movingrange'>
                        </Movingrange>  
                    </Fullrange>
                </Container>
                <br/>
                <input type='range' min="1" max="100"  className="slider" id="myRange"></input>
            </div>
        )
    }
}
export default LoadBarWithSlider