import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function AddToFav(props) {

  const [data, setData] = useState({
    travelBy: '',
    depart: '',
    arrive: '',
    departTime: '',
    arriveTime: '',
    duation: '',
    direction: '',
    departLon: '',
    departLat: '',
    arrivalLon: '',
    arrivalLat: '',
    carbonPrint: ''
  })

  console.log(props)

  useEffect(() => {
    if (props){
      console.log(props.route.response.route[0].mode.transportModes[0])
      setData({
        travelBy: `${props.route.response.route[0].mode.transportModes[0] === 'publicTransportTimeTable' ? 'public' : props.route.response.route[0].mode.transportModes[0]}`,
        depart: `${props.time.toLocalString()}`,
        arrive: '',
        departTime: '',
        arriveTime: '',
        duation: '',
        direction: '',
        departLon: '',
        departLat: '',
        arrivalLon: '',
        arrivalLat: '',
        carbonPrint: ''
      })
    }
    
  }, [props])
    
  


  function handleSubmit() {
    axios.post(`/api/routes/${data.travelBy}`, data)
      .then(() => {
        props.history.push('/user')
      })   
  }
  


  return (
    <div> 
      <button onClick={(e) => handleSubmit(e)}>Add to Favorite</button>
    </div>
  )
}
