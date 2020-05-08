import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import Auth from '../lib/Auth'
import Map from './Map'



export default function SingleRoute(props) {

  const [singleData, setSingleData] = useState()



  useEffect(() => {
    axios.get(`/api/routes/${props.location.type}/${props.match.params.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => setSingleData(res.data))
  }, [])


  if (!singleData) {
    return <div>Loading...</div>
  }



  return (
    <div>

      <button><Link to='/user'>Dashboard</Link></button>
      <button><Link to='/'>Back to Search</Link></button>

      <div>
        {singleData.travelBy === 'public' && <div>Travel with Public Transport</div>}
        {singleData.travelBy === 'car' && <div>Self Driving</div>}
        {singleData.travelBy === 'bicycle' && <div>Cycle with Your Bike</div>}
      </div>

      <div>
        {singleData.direction}
      </div>

      <div>
        Depart at: {singleData.departTime}
      </div>

      <div>
        Arrive at: {singleData.arriveTime}
      </div>

      <div>
        Carbon Print: {singleData.carbonPrint} Kilontons
      </div>

      {singleData && <Map 
        singleData={singleData}
      />}

      {singleData.instruction.split(',').map((x, i) => {
        return <div key={i}>{x}</div>
      })}

    </div>
  )
}
