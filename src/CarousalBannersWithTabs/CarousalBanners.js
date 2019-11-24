import React from 'react'
import {
    ItemImage,
    ItemContainer, 
    Container,
    GalleryContainer,
    GalleryTabs,
    Tab
} from './CarousalBanners.style'

class CarousalBanners extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
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

    swapImagesTabs = (transformDisplacement, tabId)=>{ 
            this.setState({
                displacement:transformDisplacement,
                tabId : tabId
            }) 
    }


    render(){
        return(
        <GalleryContainer>
            <Container id='container'>
                {
                    this.state.ImagesURL.map((image)=>{
                        return(
                            <ItemContainer id='galleryitem' displacement={this.state.displacement}>
                                <ItemImage  src={image}/> 
                            </ItemContainer>
                        )
                    })
                }
            </Container> 
            <GalleryTabs>
                {
                    this.state.ImagesURL.map((image,index)=>{
                        return(
                            <Tab active={this.state.tabId === `tab_${index}`}  onClick={()=>this.swapImagesTabs(index*100,`tab_${index}`)}>
                                <ItemImage active={this.state.tabId === `tab_${index}`} small src={image}/> 
                            </Tab>  
                        )
                    })
                }
            </GalleryTabs>
        </GalleryContainer>
        )
    }
}
export default CarousalBanners