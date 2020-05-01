import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/Auth'


export default function User() {

  const [userData, setUserData] = useState()

  useEffect(() => {
    axios.get('/api/routes/traveler/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => setUserData(res.data))
  }, [])



  return (
    <div>
      <div>Public Transport Routes: </div>
      {userData && <div>{userData[0].publicRoutes.map((direction, i) => {
        return <div key={i}>{direction.direction}</div>
      })}</div>}
      <div>Self-drive Routes: </div>
      {userData && <div>{userData[0].driveRoutes.map((direction, i) => {
        return <div key={i}>{direction.direction}</div>
      })}</div>}
      <div>Cycle Routes: </div>
      {userData && <div>{userData[0].cycleRoutes.map((direction, i) => {
        return <div key={i}>{direction.direction}</div>
      })}</div>}
    </div>
  )
}
