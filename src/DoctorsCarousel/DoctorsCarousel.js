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
            BannersNumber : 7,
            BannerIdx : 0,
            
            fullContainerWidth : 0,
            totalItemWidth : 0,
            totalIetmSWidth : 0,
            rest : 0,

            displacement : 0,
            LDisplacement : 0,
            RDisplacement : 0,

            displacement:0,
            tabId : 'tab_0',
            ImagesURL:[
                'https://cdn.pixabay.com/photo/2019/11/10/16/47/nature-4616282_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/08/09/27/panorama-4610864_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/50/camping-4609879_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/11/07/20/42/camping-4609863_960_720.jpg'
            ]
        }
    }

    componentDidMount(){
        let carouselContainer = document.getElementById('container') //Carousal Container
        let carouselItem = document.getElementById('galleryitem') //Carousal Card Item
        let fullContainerWidth = parseInt( window.getComputedStyle(carouselContainer).width); //Carousal Container Width
        let itemWidth = parseInt( window.getComputedStyle(carouselItem).width);
        let itemRMargin = parseInt( window.getComputedStyle(carouselItem).marginRight);
        let itemLMargin = parseInt( window.getComputedStyle(carouselItem).marginLeft);
        let totalItemWidth = itemWidth + itemRMargin + itemLMargin; //Carousal Card Item Full Width with margins
        let totalIetmSWidth = totalItemWidth * this.state.BannersNumber; //Full Width for all Cards
        
        let LDisplacement = totalIetmSWidth - fullContainerWidth
        
        this.setState({
            fullContainerWidth : fullContainerWidth, //width of the container
            totalItemWidth : totalItemWidth, //ONE Item
            totalIetmSWidth : totalIetmSWidth, // ItemWidth * no of items
            LDisplacement : LDisplacement
        });


    }

    goRight = ()=>{ 
        if ( this.state.LDisplacement > 0 && this.state.LDisplacement > this.state.totalItemWidth ){
            this.setState(prevState =>({
                RDisplacement :  prevState.RDisplacement += prevState.totalItemWidth,
                LDisplacement :  prevState.LDisplacement -= prevState.totalItemWidth,
                displacement : prevState.displacement + 100
            }))
        }
        else{
            this.setState(prevState =>({
                RDisplacement :  prevState.RDisplacement += prevState.LDisplacement,
                LDisplacement :  0,
                displacement : prevState.displacement + ((prevState.LDisplacement/prevState.totalItemWidth)*100)
            }))
        }
    }
    goLeft = ()=>{   
            if ( this.state.RDisplacement > 0 && this.state.RDisplacement > this.state.totalItemWidth ){
                this.setState(prevState =>({
                    RDisplacement :  prevState.RDisplacement -= prevState.totalItemWidth,
                    LDisplacement :  prevState.LDisplacement += prevState.totalItemWidth,
                    displacement : prevState.displacement - 100
                }))
            }
            else{
                this.setState(prevState =>({
                    RDisplacement :  0,
                    LDisplacement :  prevState.LDisplacement += prevState.RDisplacement,
                    displacement : prevState.displacement - ((prevState.RDisplacement/prevState.totalItemWidth)*100)
                }))
            }
    }


    render(){
        return(
        <GalleryContainer>
            <div style={{position: 'relative'}}> 

                <SideIndicator style={{transform: 'scale(-1, 1)'}}> 
                    <IndicatorCaret>❯</IndicatorCaret> 
                </SideIndicator>
                <SideIndicator style={{right: '0px'}}> 
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