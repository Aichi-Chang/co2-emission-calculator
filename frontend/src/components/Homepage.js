import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function Homepage() {

  const [route, setRoute] = useState()


  useEffect(() => {
    axios.get('https://api.tfl.gov.uk/journey/journeyresults/51.496518,-0.146452/to/51.489864,-0.040245?nationalsearch=false&date=20200408&time=1530&timeis=departing&useMultiModalCall=true')
      .then(res => setRoute(res.data))
  }, [])


  console.log(route)

  return (
    <div>
      <h1>heyyy</h1>
    </div>
  )
}


