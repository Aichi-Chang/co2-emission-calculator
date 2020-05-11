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
    <div className='ml6 mr6 mt5 mt1-l'>

      <Link className='link black mb3' to='/'><button className='small-button pointer grow'>Back to Search</button></Link>

      {Auth.isAuthenticated && <div className='pa3 bg-white ba mt3'>
        <h2>
          {singleData.travelBy === 'public' && <div>Travel with Public Transport</div>}
          {singleData.travelBy === 'car' && <div>Self Driving</div>}
          {singleData.travelBy === 'bicycle' && <div>Cycle with Your Bike</div>}
        </h2>

        <p className='dark-green'>
          {singleData.direction}
        </p>

        <p className='dark-green'>
          Depart at: {singleData.departTime}
        </p>

        <p className='dark-green'>
          Arrive at: {singleData.arriveTime}
        </p>

        <p className='dark-green'>
          Carbon Print: <span className='gold'>{singleData.carbonPrint}</span> Kilontons
        </p>
        {/* 
        {singleData && <Map 
          singleData={singleData}
        />} */}

        <p className='dark-green'>Direction: </p>

        {singleData.instruction.split(',').map((x, i) => {
          return <p key={i} className='black avenir'>➡️ {x}</p>
        })}
      
      </div>}
      
    </div>
  )
}
