import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../lib/Auth'


export default function User() {

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


  if (!userData) {
    return <h3 className='ml3 flex justify-center'>Please <Link to='/login' className='primary-green'>login</Link> or <Link to='/register' className='primary-green'>sign up</Link> for full access of the dashboard.</h3>
  }


  return (
    
    <div className='ml3 mr3 '>
      
      {Auth.isAuthenticated() && 
      <div className='mt4'>
        
        <div className='flex flex-row-l flex-column items-center-l items-start'>
          <h2 className='mr4-l'>{Auth.getUser().username}'s Dahsboard </h2>
          <Link className='link black' to='/'><button className='small-button pointer grow'>Back to Search</button></Link>
        </div>

        <div className='mt3-l mb3-l'>
          <h3 className='black bb pa2'>Public Transport Routes: </h3>
          {userData[0].publicRoutes.map((direction, i) => {
            return <div key={i} className='mb2-l mb3 flex flex-column flex-column flex-row-l items-center-l'>
              <Link
                className='link avenir primary-green grow mr3-l mb2'
                value={direction.travelBy}
                key={direction.id}
                index={i}
                to={{
                  pathname: `/route/${direction.id}`,
                  type: `${direction.travelBy}` 
                }}
              >
                🟡 {direction.direction}
              </Link>
              <button
                className='small-button pointer grow w-40 w-10-l'
                value={direction.travelBy}
                id={direction.id}
                onClick={(e) => handleDeletePublic(e)}
              >Delete Route ✖️</button>
            </div>
          })}
        </div>

        <div className='mt3-l mb3-l'>
          <h3 className='black bb pa2'>Self-drive Routes: </h3>
          {userData[0].driveRoutes.map((direction, i) => {
            return <div key={i} className='mb2-l mb3 flex flex-column flex-column flex-row-l items-center-l '>
              <Link
                className='link avenir primary-green grow mr3-l mb2'
                value={direction.travelBy}
                key={direction.id}
                index={i}
                to={{
                  pathname: `/route/${direction.id}`,
                  type: `${direction.travelBy}` 
                }}
              >
                🟠 {direction.direction}
              </Link>
              <button
                className='small-button pointer grow w-40 w-10-l'
                value={direction.travelBy}
                id={direction.id}
                onClick={(e) => handleDeletePublic(e)}
              >Delete Route ✖️</button>
            </div>
          })}
        </div>

        
        <div className='mt3-l mb3-l mb5'>
          <h3 className='black bb pa2'>Cycle Routes: </h3>
          {userData[0].cycleRoutes.map((direction, i) => {
            return <div key={i} className='mb2-l mb3 flex flex-column flex-row-l items-center-l'>
              <Link
                className='link avenir primary-green grow mr3-l mb2'
                key={direction.id}
                index={i}
                to={{
                  pathname: `/route/${direction.id}`,
                  type: `${direction.travelBy}` 
                }}
              >
                🟢 {direction.direction}
              </Link>
              <button
                className='small-button pointer grow w-40 w-10-l'
                value={direction.travelBy}
                id={direction.id}
                onClick={(e) => handleDeletePublic(e)}
              >Delete Route ✖️</button>
            </div>
          })}
        </div>
        

      
      </div>}


    </div>
  )
}
