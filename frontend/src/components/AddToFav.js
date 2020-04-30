import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
// remeber to add {}
import { PostcodesContext } from './Postcodes'
import Auth from '../lib/Auth'


export default function AddToFav(props) {

  const postcodes = useContext(PostcodesContext)

  const initialState = {
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
  }

  const [data, setData] = useState(initialState)


  useEffect(() => {

    if (props){
      setData({
        travelBy: `${props.route.response.route[0].mode.transportModes[0] === 'publicTransportTimeTable' ? 'public' : props.route.response.route[0].mode.transportModes[0]}`,
        depart: `${postcodes.postcodeFrom}`.toUpperCase(),
        arrive: `${postcodes.postcodeTo}`.toUpperCase(),
        departTime: `${props.time.time}`,
        arriveTime: moment().add(`${Math.round(props.route.response.route[0].summary.baseTime / 60)}`, 'm').toString(),
        duation: `${Math.round(props.route.response.route[0].summary.baseTime / 60)} minute`,
        direction: `Travel from ${props.route.response.route[0].waypoint[0].label} to ${props.route.response.route[0].waypoint[1].label}`,
        departLon: `${props.route.response.route[0].waypoint[0].originalPosition.longitude}`,
        departLat: `${props.route.response.route[0].waypoint[0].originalPosition.latitude}`,
        arrivalLon: `${props.route.response.route[0].waypoint[1].originalPosition.longitude}`,
        arrivalLat: `${props.route.response.route[0].waypoint[1].originalPosition.latitude}`,
        carbonPrint: `${props.carb}`
      })
    }
    
  }, [props])
    
  


  function handleSubmit() {
    axios.post(`/api/routes/${data.travelBy}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
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
