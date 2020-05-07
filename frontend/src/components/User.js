import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../lib/Auth'


export default function User(props) {

  const [userData, setUserData] = useState()

  useEffect(() => {
    axios.get('/api/routes/traveler/', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => setUserData(res.data))
  }, [])


  function handleDeletePublic(e) {
    axios.delete(`api/routes/${e.target.value}/${e.target.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    window.location.reload()
  }



  return (
    
    <div>
      {Auth.isAuthenticated() && 
      <div>
        <button><Link to='/'>Back to Search</Link></button>

        <div>Public Transport Routes: </div>

        {userData && <div>{userData[0].publicRoutes.map((direction, i) => {
          return <div key={i}>
            <Link
              value={direction.travelBy}
              key={direction.id}
              index={i}
              to={{
                pathname: `/route/${direction.id}`,
                type: `${direction.travelBy}` 
              }}
            >
              {direction.direction}
            </Link>
            <button
              value={direction.travelBy}
              id={direction.id}
              onClick={(e) => handleDeletePublic(e)}
            >Delete Route</button>
          </div>
        })}</div>}

        <div>Self-drive Routes: </div>
        {userData && <div>{userData[0].driveRoutes.map((direction, i) => {
          return <div key={i}>
            <Link
              value={direction.travelBy}
              key={direction.id}
              index={i}
              to={{
                pathname: `/route/${direction.id}`,
                type: `${direction.travelBy}` 
              }}
            >
              {direction.direction}
            </Link>
            <button
              value={direction.travelBy}
              id={direction.id}
              onClick={(e) => handleDeletePublic(e)}
            >Delete Route</button>
          </div>
        })}</div>}

        <div>Cycle Routes: </div>
        {userData && <div>{userData[0].cycleRoutes.map((direction, i) => {
          return <div key={i}>
            <Link
              key={direction.id}
              index={i}
              to={{
                pathname: `/route/${direction.id}`,
                type: `${direction.travelBy}` 
              }}
            >
              {direction.direction}
            </Link>
            <button
              value={direction.travelBy}
              id={direction.id}
              onClick={(e) => handleDeletePublic(e)}
            >Delete Route</button>
          </div>
        })}</div>}
      </div>}
    </div>
  )
}
