import React, { useState, useEffect } from 'react'
import axios from 'axios'





export default function TFLresult({ latitudeFrom, longitudeFrom, latitudeTo, longitudeTo, latLng }) {

  const [route, setRoute] = useState()
  const [result, setResult] = useState(null)


  useEffect(() => {
    setResult(latLng)
    
    if (result !== null) {
      axios.get(`https://api.tfl.gov.uk/journey/journeyresults/${latitudeFrom},${longitudeFrom}/to/${latitudeTo},${longitudeTo}?nationalsearch=false&date=20200408&time=1530&timeis=departing&useMultiModalCall=true`) 
        .then(res => setRoute(res.data))
    }
    
  }, [latLng])

  if (result) {
    console.log(result.result)
  }

  
  
  if (route) {
    console.log(route.journeys)
  }



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


