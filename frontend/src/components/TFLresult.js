import React, { useState, useEffect } from 'react'
import axios from 'axios'

import 'core-js/stable'
import 'regenerator-runtime/runtime'




export default function TFLresult(props) {

  const [route, setRoute] = useState()
  const [result, setResult] = useState(null)
  // const [depart, setDepart] = useState(null)
  const [time, setTime] = useState(new Date())
    

  
  // The argument passed to useState is the initial state much like setting state in constructor for a class component 
  // and isn't used to update the state on re-render
  // https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
  useEffect(() => { 

    console.log(props.latLng ? props.latLng.result[0].result.latitude : 'waiting...')
    if (props.latLng) {
      console.log('route set')
      axios.get(`https://api.tfl.gov.uk/journey/journeyresults/${props.latLng.result[0].result.latitude},${props.latLng.result[0].result.longitude}/to/${props.latLng.result[1].result.latitude},${props.latLng.result[1].result.longitude}?nationalsearch=false&date=${time.getFullYear()}${time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1}${time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()}&time=${time.getUTCHours() + 1 < 10 ? '0' + (time.getUTCHours() + 1) : time.getUTCHours() + 1}${time.getUTCMinutes() < 10 ? '0' + (time.getUTCMinutes()) : time.getUTCMinutes()}&timeis=departing&useMultiModalCall=true`)
        .then(res => setRoute(res.data))
    }  

  }, [props])
  

  
  if (route) {
    console.log(route.journeys)
    
    const legs = route.journeys.map(summary =>{
      return summary.legs
    })
    // tube
    const modeObjZero = legs[0].map(mode => {
      return mode.mode
    })
    // tube
    const modeObjOne = legs[1].map(mode => {
      return mode.mode
    })
    // tube
    const modeObjTwo = legs[2].map(mode => {
      return mode.mode
    })
    // bus
    const modeObjThree = legs[3].map(mode => {
      return mode.mode
    })
    // cycle
    const modeObjFour = legs[4].map(mode => {
      return mode.mode
    })
    // cycle hire
    const modeObjFive = legs[5].map(mode => {
      return mode.mode
    })

    // console.log(modeObjZero.map(id => {
    //   return id.id
    // }))
    // console.log(modeObjOne.map(id => {
    //   return id.id
    // }))
    // console.log(modeObjTwo.map(id => {
    //   return id.id
    // }))
    // console.log(modeObjThree.map(id => {
    //   return id.id
    // }))
    // console.log(modeObjFour.map(id => {
    //   return id.id
    // }))
    // console.log(modeObjFive.map(id => {
    //   return id.id
    // }))
  }



 

  
  // console.log(modeObjZero.map(id => {
  //   return id.id
  // }))
  // console.log(modeObjOne.map(id => {
  //   return id.id
  // }))
  // console.log(modeObjTwo.map(id => {
  //   return id.id
  // }))
  // console.log(modeObjThree.map(id => {
  //   return id.id
  // }))
  // console.log(modeObjFour.map(id => {
  //   return id.id
  // }))
  // console.log(modeObjFive.map(id => {
  //   return id.id
  // }))
  

  return (
    <div>
      <div></div>
    </div>
  )
}


