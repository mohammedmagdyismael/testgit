import React from 'react'
import {
    ItemImage,
    ItemContainer,
    ItemTitle,
    Container,
    SmallItems,
    RButton,
    LButton,
    Controls
} from './CarousalBanners.style'

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
            RDisplacement : 0
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
        <div >
            <Container id='container'>
                <ItemContainer id='galleryitem' displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>1</ItemTitle>
                </ItemContainer>
                <ItemContainer displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>2</ItemTitle>
                </ItemContainer>
                <ItemContainer displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>3</ItemTitle>
                </ItemContainer>
                <ItemContainer displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>4</ItemTitle>
                </ItemContainer>
                <ItemContainer displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>5</ItemTitle>
                </ItemContainer>
                <ItemContainer displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>6</ItemTitle>
                </ItemContainer>
                <ItemContainer displacement={this.state.displacement}>
                    <ItemImage src='https://placekitten.com/400/400'/>
                    <ItemTitle>7</ItemTitle>
                </ItemContainer>
            </Container>
     
                <LButton id="btnl" onClick={()=>this.goLeft()}> &#10095; </LButton>
                <RButton id="btnr" onClick={()=>this.goRight()}>&#10094;  </RButton>
        
        </div>

        )
    }
}
export default CarousalBanners