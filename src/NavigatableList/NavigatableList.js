import React from 'react'
import {Item} from './NavigatableList.style'

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
        const allI = document.getElementsByClassName('x')
        let count = undefined;

        document.body.addEventListener('keydown',(e)=>{
            
            //Up
            if(e.which === 38){  
                if(this.state.selected){
                    console.log(this.state.navCounterPrev,this.state.navCounterCurrent)
                    Array.prototype.forEach.call(allI, function(el) {el.style.backgroundColor = "white";});
                    this.setState({navCounterCurrent : this.state.navCounterPrev - 1,  navCounterPrev : this.state.navCounterPrev - 1},()=>{
                        if (this.state.navCounterPrev >= 0){ 
                            document.querySelectorAll('.x')[this.state.navCounterPrev].style.backgroundColor = "red";
                        }
                        else{
                            this.setState({navCounterPrev : 2, navCounterCurrent : 2 },()=>{
                                document.querySelectorAll('.x')[this.state.navCounterPrev].style.backgroundColor = "red";
                            })
                        }

                    })
                }
                else{
                    Array.prototype.forEach.call(allI, function(el) {el.style.backgroundColor = "white";});
                    document.querySelectorAll('.x')[this.state.navCounterPrev].style.backgroundColor = "red"; 
                    this.setState({selected:true, navCounterCurrent : this.state.navCounterPrev})
                }
            }
            //Down
            else if(e.which === 40){   
                if(this.state.selected){
                    Array.prototype.forEach.call(allI, function(el) {el.style.backgroundColor = "white";});
                    this.setState({navCounterPrev : this.state.navCounterCurrent , navCounterCurrent : this.state.navCounterCurrent + 1},()=>{
                        if (this.state.navCounterCurrent < allI.length){ 
                            document.querySelectorAll('.x')[this.state.navCounterCurrent].style.backgroundColor = "red";
                        }
                        else{
                            this.setState({navCounterCurrent : 0},()=>{
                                document.querySelectorAll('.x')[this.state.navCounterCurrent].style.backgroundColor = "red";
                            })
                        }

                    })
                }
                else{
                    Array.prototype.forEach.call(allI, function(el) {el.style.backgroundColor = "white";});
                    document.querySelectorAll('.x')[this.state.navCounterCurrent].style.backgroundColor = "red"; 
                    this.setState({selected:true})
                }
            }
            //Enter
            else if(e.which === 13){
                allI[this.state.navCounterCurrent].click(); 
                console.log(allI[this.state.navCounterCurrent].innerHTML)
            }
        })
    }
    render(){
        return(
            <div >
                <ul>
                    <Item   id='list'><a className = 'x' href="#">First ink</a></Item>
                    <Item  id='list'><a className = 'x' href="#">Second Link</a></Item>
                    <Item  id='list'><a className = 'x' href="#">Third Link</a></Item>
                </ul>
                
            </div>
        )
    }
}
export default NavigatableList