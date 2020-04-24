import React, { useState, useEffect } from 'react'
import axios from 'axios'

import 'core-js/stable'
import 'regenerator-runtime/runtime'




export default function TFLresult(props) {

  const [route, setRoute] = useState()
  // const [result, setResult] = useState(null)
  // const [depart, setDepart] = useState(null)
  const [time, setTime] = useState(new Date())
  const [mode, setMode] = useState({ value: 'publicTransportTimeTable' })
  const [vehicle, setVehicle] = useState({ value: '&vehicletype=gasoline%2C5.5' }) 

  
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
      console.log('route set2')
      axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?waypoint0=${props.latLng.result[0].result.latitude}%2C${props.latLng.result[0].result.longitude}&waypoint1=${props.latLng.result[1].result.latitude}%2C${props.latLng.result[1].result.longitude}&mode=fastest;${mode.value}${mode.value === 'car' ? vehicle.value : ''}&departure=now&apiKey=vqwt8WCBsecZgJJBRcIY4yJAeWx9rRtfifIQG8u67HY`)
        .then(res => setRoute(res.data))
    }

  }, [props])
  



  function handleChange(e) {
    setMode({ value: e.target.value })
  }

  function handleChange2(e) {
    setVehicle({ value: e.target.value })
  }

  
  if (route) {
    console.log(route)
  }

  

 

  return (
    <div>

      <select value={mode.value} onChange={(e) => handleChange(e)}>
        <option disabled>Travel Mode</option>
        <option value='publicTransportTimeTable'>Public Transport</option>
        <option value='car'>Drive</option>
        <option value='bicycle'>Cycle</option>
        {/* <option name='drive'>drive</option> */}
      </select>


      {mode.value === 'car' && <select value={vehicle.value} onChange={(e) => handleChange2(e)}>
        <option disabled>Vehicle Type</option>
        <option value='&vehicletype=gasoline%2C5.5'>Gasoline Engine</option>
        <option value='&vehicletype=diesel%2C5.5'>Diesel Engine</option>
        <option value='&vehicletype=electric%2C5.5'>Electric Engine</option>
      </select> }

      {/* <div>{route && modeObjZero.map(id => {
        return id.id
      })}</div>
      <div>{route && modeObjOne.map(id => {
        return id.id
      })}</div>
      <div>{route && modeObjTwo.map(id => {
        return id.id
      })}</div> */}

      <div>Depart at: {time.toLocaleString()}</div>

      {route && <div>
        <div>
          {(route.response.route[0].summary.distance / 1000).toFixed(1)} KM 
        </div>
        <div> 
          {Math.round(route.response.route[0].summary.baseTime / 60)} Min
        </div>
      </div>}
      {route && route.response.route[0].mode.transportModes[0] === 'car' && <div>{route.response.route[0].summary.co2Emission} Kilotons</div>}
      {route && route.response.route[0].mode.transportModes[0] === 'publicTransportTimeTable' && <div>{((route.response.route[0].summary.distance / 1000).toFixed(1) * 0.042).toFixed(3)} Kilontons</div>}
      {route && route.response.route[0].mode.transportModes[0] === 'bicycle' && <div>0 Kilontons</div>}
    </div>
  )
}


