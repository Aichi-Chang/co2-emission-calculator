import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function Homepage() {

  const [route, setRoute] = useState()


  useEffect(() => {
    axios.get('https://api.tfl.gov.uk/journey/journeyresults/51.496518,-0.146452/to/51.489864,-0.040245?nationalsearch=false&date=20200408&time=1530&timeis=departing&useMultiModalCall=true')
      .then(res => setRoute(res.data))
  }, [])


  if (!route) {
    return null
  }

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


  console.log(route.journeys)
  console.log(modeObjZero.map(id => {
    return id.id
  }))
  console.log(modeObjOne.map(id => {
    return id.id
  }))
  console.log(modeObjTwo.map(id => {
    return id.id
  }))
  console.log(modeObjThree.map(id => {
    return id.id
  }))
  console.log(modeObjFour.map(id => {
    return id.id
  }))
  console.log(modeObjFive.map(id => {
    return id.id
  }))
  

  return (
    <div>
      <h1>heyyy</h1>
    </div>
  )
}


