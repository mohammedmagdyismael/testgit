import React from 'react'
import axios from 'axios'



class GMaps extends React.Component{

    componentDidMount(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( (position)=>{
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  }; 
                axios.get(`https://papi2-prelive2.drbridge.com/api/PatientProfile/GetUserLocation?firstlat=${pos.lat}&firstlng=${pos.lng}`,
                  {
                      headers:{
                        "Authorization": '7e6363f0-c285-4d2c-9b4b-71e858b8f412',
                        "CountryId": 1,
                        "language_cache": 1, 
                        "country_cache": 1,
                        "languageId": 1, 
                        "Host": 'papi2-prelive2.drbridge.com',
                        "x-vzt-token": '7e6363f0-c285-4d2c-9b4b-71e858b8f412',
                        "x-vzt-authorization": '832c0690228ebce730d6c1ab9758f7486e54e16fa395f0c8efc0f07023848bdc'
                      }
                  }
                ).then((resp)=>{
                    console.log("myarea",resp)
                })
            });
        }
    }
    render(){
        return null
    }
}
export default GMaps