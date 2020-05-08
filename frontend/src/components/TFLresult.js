import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddToFav from './AddToFav'
import moment from 'moment'
import Map from './Map'
import Auth from '../lib/Auth'

import 'core-js/stable'
import 'regenerator-runtime/runtime'



export default function TFLresult(props) {

  const [route, setRoute] = useState()
  const [carb, setcarb] = useState()
  const [time, setTime] = useState({ time: moment().format('LLL') })
  const [mode, setMode] = useState({ value: 'publicTransportTimeTable' })
  const [vehicle, setVehicle] = useState({ value: '&vehicletype=gasoline%2C5.5' }) 
  const [instruction, setInstruction] = useState([])

  
  // The argument passed to useState is the initial state much like setting state in constructor for a class component 
  // and isn't used to update the state on re-render
  // https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
  useEffect(() => { 

    // console.log(props.latLng ? props.latLng.result[0].result.latitude : 'waiting...')
    // Setting initial state based on prop when using useState Hook
    // https://stackoverflow.com/questions/56574442/setting-initial-state-based-on-prop-when-using-usestate-hook

    // TFL URL
    // `https://api.tfl.gov.uk/journey/journeyresults/${props.latLng.result[0].result.latitude},${props.latLng.result[0].result.longitude}/to/${props.latLng.result[1].result.latitude},${props.latLng.result[1].result.longitude}?nationalsearch=false&date=${time.getFullYear()}${time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1}${time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()}&time=${time.getUTCHours() + 1 < 10 ? '0' + (time.getUTCHours() + 1) : time.getUTCHours() + 1}${time.getUTCMinutes() < 10 ? '0' + (time.getUTCMinutes()) : time.getUTCMinutes()}&timeis=departing&journeyPreference=LeastInterchange&mode=${mode.value}`)
    
    if (props.latLng) {
      axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?waypoint0=${props.latLng.result[0].result.latitude}%2C${props.latLng.result[0].result.longitude}&waypoint1=${props.latLng.result[1].result.latitude}%2C${props.latLng.result[1].result.longitude}&mode=fastest;${mode.value}${mode.value === 'car' ? vehicle.value : ''}&departure=now&apiKey=vqwt8WCBsecZgJJBRcIY4yJAeWx9rRtfifIQG8u67HY`)
        .then(res => setRoute(res.data))
    }

    setInterval(() => {
      displayTime()
    }, 60000)

  }, [props])


  // Should I use one or many useEffect in component?
  // https://stackoverflow.com/questions/54002792/should-i-use-one-or-many-useeffect-in-component
  useEffect(() => {
    if (route) {
      if (route.response.route[0].mode.transportModes[0] === 'publicTransportTimeTable') {
        setcarb(((route.response.route[0].summary.distance / 1000).toFixed(1) * 0.042).toFixed(3))
      } else if (route.response.route[0].mode.transportModes[0] === 'car') {
        setcarb(route.response.route[0].summary.co2Emission)
      } else if (route.response.route[0].mode.transportModes[0] === 'bicycle') {
        setcarb(0)
      }

      const fullIns = route.response.route[0].leg[0].maneuver.map((instruction) => {
        return instruction.instruction
      })
      const regex = /(<span class="exit">|<span class="sign">|<span lang="en">|<span class="number">|<span class="toward_street">|<span class="stops">|<span class="line">|<span class="destination">|<span class="transit">|<span class="station">|<span class="company">|<span class="next-street">|<span class="street">|<span class="heading">|<span class="length">|<span class="distance-description">|<span class="direction">|<\/span>)/g
      
      const fullInstruction = fullIns.map(ins => {
        return ins.replace(regex, '')
      })

      setInstruction(fullInstruction)
    }

  }, [route])
  

  function displayTime() {
    setTime({ time: moment().format('LLL') })
  }


  function handleChange(e) {
    setMode({ value: e.target.value })
  }

  function handleChange2(e) {
    setVehicle({ value: e.target.value })
  }
    
 
  if (!route) {
    return <div>Where would you like to go?</div>
  }

  return (
    <div>

      <select value={mode.value} onChange={(e) => handleChange(e)}>
        <option disabled>Travel Mode</option>
        <option value='publicTransportTimeTable'>Public Transport</option>
        <option value='car'>Drive</option>
        <option value='bicycle'>Cycle</option>
      </select>


      {mode.value === 'car' && <select value={vehicle.value} onChange={(e) => handleChange2(e)}>
        <option disabled>Vehicle Type</option>
        <option value='&vehicletype=gasoline%2C5.5'>Gasoline Engine</option>
        <option value='&vehicletype=diesel%2C5.5'>Diesel Engine</option>
        <option value='&vehicletype=electric%2C5.5'>Electric Engine</option>
      </select> }

      <div>Depart at: {time.time}</div>

      <div>
        <div>
          {(route.response.route[0].summary.distance / 1000).toFixed(1)} KM 
        </div>
        <div> 
          {Math.round(route.response.route[0].summary.baseTime / 60)} Min
        </div>
      </div>

      <div>{carb} Kilontons</div>

      {Auth.isAuthenticated() && <AddToFav 
        route={route}
        time={time}
        carb={carb}
        instruction={instruction}
      />}
      
      <Map route={route} />

      <div>{instruction.map((p, i) => {
        return <p key={i}>{p}</p>
      })}</div>
    </div>
  )
}


