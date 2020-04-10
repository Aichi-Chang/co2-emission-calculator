import React, { useState, useEffect } from 'react'
import axios from 'axios'

import 'core-js/stable'
import 'regenerator-runtime/runtime'




export default function TFLresult({ latitudeFrom, longitudeFrom, latitudeTo, longitudeTo, latLng, date }) {

  const [route, setRoute] = useState()
  const [result, setResult] = useState(null)
  const [depart, setDepart] = useState(null)

    
  

  useEffect(() => {

    async function fetchTFL() {
      try {
        const response = await axios.get(
          `https://api.tfl.gov.uk/journey/journeyresults/${latitudeFrom},${longitudeFrom}/to/${latitudeTo},${longitudeTo}?nationalsearch=false&date=${depart.getFullYear()}${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()}&time=${date.getUTCHours() + 1 < 10 ? '0' + (date.getUTCHours() + 1) : date.getUTCHours() + 1}${date.getUTCMinutes() < 10 ? '0' + (date.getUTCMinutes()) : date.getUTCMinutes()}&timeis=departing&useMultiModalCall=true`)
        const res = await response.data
        setRoute(res)
      } catch (e) {
        console.log(e)
      }
    }
  
    setResult(latLng)
    setDepart(date)

    fetchTFL()
  }, [latLng])
  
  
    
  console.log(date)
  console.log(depart)



  
  // if (selecDay !== null) {
  //   console.log(selecMonth)

  // }
  

  
  if (route) {
    console.log(route.journeys)
    
    // const legs = route.journeys.map(summary =>{
    //   return summary.legs
    // })
    // // tube
    // const modeObjZero = legs[0].map(mode => {
    //   return mode.mode
    // })
    // // tube
    // const modeObjOne = legs[1].map(mode => {
    //   return mode.mode
    // })
    // // tube
    // const modeObjTwo = legs[2].map(mode => {
    //   return mode.mode
    // })
    // // bus
    // const modeObjThree = legs[3].map(mode => {
    //   return mode.mode
    // })
    // // cycle
    // const modeObjFour = legs[4].map(mode => {
    //   return mode.mode
    // })
    // // cycle hire
    // const modeObjFive = legs[5].map(mode => {
    //   return mode.mode
    // })

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



 



  // console.log(latLng)
  // console.log(latitudeFrom)

  
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
      <h1>-- Carbon Print Calculator --</h1>
    </div>
  )
}


