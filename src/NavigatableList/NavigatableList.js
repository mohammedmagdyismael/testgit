import React from 'react'


class NavigatableList extends React.Component{

    componentDidMount(){
        let allI = document.getElementsByClassName('x')
        let count = undefined;

        document.body.addEventListener('keydown',(e)=>{
            //Up
            if(e.which === 38){ 
                if(count === undefined) count = allI.length - 1;
                if (count === allI.length-1){ 
                    allI[count-1].style.color = 'red';
                    allI[count].style.color = 'black';
                    count -= 1;
                }
                else if(count >= 0 && count < allI.length-1){ 
                    if(count !== 0)count -= 1;   
                    allI[count].style.color = 'red';
                    allI[count+1].style.color = 'black';
                }
            }
            //Down
            else if(e.which === 40){ 
                if(count === undefined || count === 0) {
                    count = 0 ;
                    allI[count].style.color = 'red';
                    count += 1;
                }
                else if(count > 0 && count < allI.length ){
                    if(count !== allI.length - 1)count += 1;  
                    allI[count].style.color = 'red';
                    allI[count - 1].style.color = 'black'  
                }
            }
            //Enter
            else if(e.which === 13){
                allI[count].click();
                console.log(allI[count].innerHTML)
            }
        })
    }
    render(){
        return(
            <div >
                <ul>
                    <li id='list'><a className = 'x' href="#">First ink</a></li>
                    <li id='list'><a className = 'x' href="#">Second Link</a></li>
                    <li id='list'><a className = 'x' href="#">Third Link</a></li>
                </ul>
                
            </div>
        )
    }
}
export default NavigatableList