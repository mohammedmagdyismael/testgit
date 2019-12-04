import React from 'react'
import {
    ItemImage,
    ItemContainer, 
    Container,
    GalleryContainer,
    GalleryTabs,
    DrName,
    Speciality,
    NumberofReviews,
    SideIndicator,
    IndicatorCaret
} from './DoctorsCarousel.style'

class CarousalBanners extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            BannersNumber : 8, 
            currentStepsToLeft : 0,
            currentStepsToRight : 0,
            translatePercantage : 0,
            displacement:0, 
            ImagesURL:[
                'https://cdn.pixabay.com/photo/2019/11/10/16/47/nature-4616282_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/08/09/27/panorama-4610864_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/50/camping-4609879_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/42/camping-4609863_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/10/16/47/nature-4616282_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/08/09/27/panorama-4610864_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/50/camping-4609879_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/42/camping-4609863_960_720.jpg'
            ]
        }
    }

    componentDidMount(){
        let carouselItem = document.getElementById('galleryitem') //Carousal Card Item
        let itemWidth = parseInt( window.getComputedStyle(carouselItem).width);
        let itemRMargin = parseInt( window.getComputedStyle(carouselItem).marginRight);
        let totalItemWidth = itemWidth + (2*itemRMargin) ; //Carousal Card Item Full Width with margins
        let marginToWidth = (2*itemRMargin)/ totalItemWidth
        let translatePercantage = (marginToWidth*100)+100
        let numberOfSteps = this.state.BannersNumber - 3
        
        //RTL
        this.setState({
            translatePercantage : translatePercantage,
            steps : numberOfSteps,
            currentStepsToLeft : 0,
            currentStepsToRight : numberOfSteps,
        })
        //LTR
        /* this.setState({
            translatePercantage : translatePercantage,
            steps : numberOfSteps,
            currentStepsToLeft : 0,
            currentStepsToRight : numberOfSteps,
        }) */
    }

    goLeft = () =>{
        if(this.state.BannersNumber > 3 &&
            this.state.currentStepsToLeft > 0){
            this.setState(prevState =>({
                displacement :  prevState.displacement -= prevState.translatePercantage,
                currentSteps : prevState.currentSteps -= 1,
                currentStepsToLeft : prevState.currentStepsToLeft -= 1,
                currentStepsToRight : prevState.currentStepsToRight += 1,
            }))
        }
    }

    goRight = ()=>{ 
        if(this.state.BannersNumber > 3 &&
            this.state.currentStepsToRight > 0){
            this.setState(prevState =>({
                displacement :  prevState.displacement += prevState.translatePercantage,
                currentSteps : prevState.currentSteps += 1,
                currentStepsToLeft : prevState.currentStepsToLeft += 1,
                currentStepsToRight : prevState.currentStepsToRight -= 1,
            }))
        }
    }


    render(){
        return(
        <GalleryContainer >
            <div style={{position: 'relative'}}> 

                <SideIndicator onClick={()=>this.goLeft()} style={{transform: 'scale(-1, 1)'}}> 
                    <IndicatorCaret>❯</IndicatorCaret> 
                </SideIndicator>

                <SideIndicator onClick={()=>this.goRight()} style={{right: '0px'}}> 
                    <IndicatorCaret>❯</IndicatorCaret> 
                </SideIndicator>

                <div style={{padding: '0px 28px'}}>
                    <Container id='container'>
                        {
                            this.state.ImagesURL.map((image)=>{
                                return(

                                    <ItemContainer id='galleryitem' displacement={this.state.displacement}>
                                        <ItemImage  src={image}/> 
                                        <DrName>Dr Nouran Omar</DrName>
                                        <Speciality>Orthodontic Consultant</Speciality>
                                        <NumberofReviews>(60)</NumberofReviews>
                                    </ItemContainer>
                                )
                            })
                        }
                    </Container> 
                </div>
            </div>
        </GalleryContainer>
        )
    }
}
export default CarousalBanners