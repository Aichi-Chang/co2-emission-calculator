import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
// remeber to add {}
import { PostcodesContext } from './Postcodes'
import Auth from '../lib/Auth'

import Snackbar from '@material-ui/core/Snackbar'





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
    maneuverLon: [],
    maneuverLat: [],
    carbonPrint: ''
  }

  const [data, setData] = useState(initialState)
  const [open, setOpen] = useState(false)


  useEffect(() => {

    if (props){

      const route = props.route.response.route[0]

      const maneuverLo = `${props.route.response.route[0].leg[0].maneuver.map(pos => {
        return pos.position.latitude
      })}`.split(',')

      const positionsLon = maneuverLo.map(num => {
        return parseFloat(num)
      })

      const maneuverLa = `${props.route.response.route[0].leg[0].maneuver.map(pos => {
        return pos.position.latitude
      })}`.split(',')

      const positionsLat = maneuverLa.map(num => {
        return parseFloat(num)
      })


      setData({
        travelBy: `${route.mode.transportModes[0] === 'publicTransportTimeTable' ? 'public' : props.route.response.route[0].mode.transportModes[0]}`,
        depart: `${postcodes.postcodeFrom}`.toUpperCase(),
        arrive: `${postcodes.postcodeTo}`.toUpperCase(),
        departTime: `${props.time.time}`,
        arriveTime: moment().add(`${Math.round(route.summary.baseTime / 60)}`, 'm').toString(),
        duation: `${Math.round(route.summary.baseTime / 60)} minute`,
        direction: `Travel from ${route.waypoint[0].label} to ${props.route.response.route[0].waypoint[1].label}`,
        departLon: parseFloat(`${route.waypoint[0].originalPosition.longitude}`),
        departLat: parseFloat(`${route.waypoint[0].originalPosition.latitude}`),
        arrivalLon: parseFloat(`${route.waypoint[1].originalPosition.longitude}`),
        arrivalLat: parseFloat(`${route.waypoint[1].originalPosition.latitude}`),
        maneuverLon: positionsLon,
        maneuverLat: positionsLat,
        carbonPrint: parseFloat(`${props.carb}`)
      })
    }
    
  }, [props])
    
  


  function handleSubmit() {
    axios.post(`/api/routes/${data.travelBy}/`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(setOpen(true))  
  }
  
  function handleClose() {
    setOpen(false)
  }


  return (
    <div> 
      <button onClick={(e) => handleSubmit(e)}>Add to Favorite</button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message='Added to dashboard!'
      />

    </div>
  )
}
