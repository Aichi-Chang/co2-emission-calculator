import React, { useState, useEffect } from 'react'
import axios from 'axios'





export default function TFLresult({ latitudeFrom, longitudeFrom, latitudeTo, longitudeTo, latLng, day, month, year, hour, minute }) {

  const [route, setRoute] = useState()
  const [result, setResult] = useState(null)
  const [selecDay, setSelecDay] = useState(null)
  const [selecMonth, setSelecMonth] = useState(null)
  const [selecYear, setSelecYear] = useState(null)
  const [selecHour, setSelecHour] = useState(null)
  const [selecMinute, setSelecMinute] = useState(null)


  useEffect(() => {
    setResult(latLng)
    setSelecDay(day < 10 ? '0' + day : day)
    setSelecMonth(month < 10 ? '0' + month : month)
    setSelecYear(year)
    setSelecHour(hour < 10 ? '0' + hour : hour)
    setSelecMinute(minute)
    
    if (result !== null) {
      axios.get(`https://api.tfl.gov.uk/journey/journeyresults/${latitudeFrom},${longitudeFrom}/to/${latitudeTo},${longitudeTo}?nationalsearch=false&date=${selecYear}${selecMonth}${selecDay}&time=${selecHour}${selecMinute}&timeis=departing&useMultiModalCall=true`) 
        .then(res => setRoute(res.data))
    }
    
  }, [latLng])


  
  if (selecDay !== null) {
    console.log(selecMonth)
    console.log(selecDay)
    console.log(selecYear)
  }
  

  
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


