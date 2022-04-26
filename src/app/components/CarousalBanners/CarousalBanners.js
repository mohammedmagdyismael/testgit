import React from 'react'
import {
    ItemImage,
    ItemContainer,
    ItemTitle,
    Container,
    SliderWrap,
    Slider,
    Holder
} from './CarousalBanners.style'

class CarousalBanners extends React.Component{
    constructor(props){
        super(props);
        this.state = {  
            slideWidth :0,
            touchstartx : undefined,
            touchmovex : undefined,
            movex : undefined,
            index : 0,
            longTouch : undefined, 
            displacement:0,

            ended : false,


            ImagesURL:[
                'https://cdn.pixabay.com/photo/2019/11/10/16/47/nature-4616282_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/08/09/27/panorama-4610864_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/50/camping-4609879_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/42/camping-4609863_960_720.jpg'
            ]
        }
    }

    componentDidMount(){


        if (navigator.msMaxTouchPoints) {
            let slider = document.getElementById('slider');
            let slideImage = document.querySelectorAll('slide-image') 

            slider.addEventListener('scroll', function() {
                slideImage.forEach((element,index) => {
                    element[index].style.transform = 'translate3d(-' + (100-element[index].scrollLeft()/6) + 'px,0,0)';
                }); 
            });
          
        } 
        else {
            let slider = document.getElementById('slide-wrapper') 

            this.setState({
                slideWidth : parseFloat( window.getComputedStyle(slider).width),
                touchstartx : undefined,
                touchmovex : undefined,
                movex : undefined,
                index : 0,
                longTouch : undefined
            })

            //Get Coordinates of the First Touch
            slider.addEventListener("touchstart", (event)=> {
                this.setState({ 
                    ended : true,
                    touchstartx : event.touches[0].pageX});   
            });
    
            slider.addEventListener("touchmove", (event)=> { 
                this.setState({touchmovex : event.touches[0].pageX});  
            });
       
            slider.addEventListener("touchend", (event)=> {
                let swippedDisplacement = 
                    (Math.abs(this.state.touchstartx - this.state.touchmovex)/this.state.slideWidth)*100
                
                if(this.state.touchstartx < 185 && this.state.touchmovex > 185 && this.state.index < 2){
                    this.setState(prev=>({
                        ended : false,
                        displacement : prev.displacement + (100-swippedDisplacement),
                        index : prev.index + 1
                    }))
                }
                else if(this.state.touchstartx > 185 && this.state.touchmovex < 185 && this.state.index > 0){
                    this.setState(prev=>({
                        ended : false,
                        displacement : prev.displacement - (100-swippedDisplacement),
                        index : prev.index - 1
                    }))
                }

            });   
          
          } 

    }


    swapImages = (currentImageIndex, destImageIndex)=>{ 
        if (destImageIndex < this.state.BannersNumber && destImageIndex >= 0 ){
            let indexDisplacement = (destImageIndex - currentImageIndex)/Math.abs(destImageIndex - currentImageIndex)
            let transformDisplacement = this.state.displacement + (indexDisplacement*100)
            console.log(transformDisplacement)
            this.setState({
                displacement:transformDisplacement,
                CurrentBanner : destImageIndex
            })
        }
    }
 
    render(){
        return(
        
                    <Container id='slide-wrapper'>

                        {
                            this.state.ImagesURL.map((image)=>{
                                return(
                                    <ItemContainer id='galleryitem' displacement={this.state.displacement}>
                                        <ItemImage className='slide-image' src={image}/>
                                    </ItemContainer>
                                )
                            })
                        }

                    </Container> 
                

        )
    }
}
export default CarousalBanners