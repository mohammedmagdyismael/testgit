import React from 'react'
import {
    ItemImage,
    ItemContainer,
    ItemTitle,
    Container,
    SmallItems
} from './Carousel.style'

class NavigatableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             
        }
    }

    componentDidMount(){
        
    }
    render(){
        return(
            <Container>
                <ItemContainer>
                    <ItemImage src='https://placekitten.com/120/115'/>
                    <ItemTitle>Dental Care</ItemTitle>
                </ItemContainer>

                <SmallItems>
                    <ItemContainer id = '1' small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer id = '6' style={{scrollSnapAlign: 'center'}} small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                    <ItemContainer small>
                        <ItemImage small src='https://placekitten.com/120/115'/>
                        <ItemTitle small>Dental Care</ItemTitle>
                    </ItemContainer>
                </SmallItems>

            </Container>

        )
    }
}
export default NavigatableList