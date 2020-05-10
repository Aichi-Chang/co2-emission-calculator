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


  if (!userData) {
    return <h3 className='ml3 flex justify-center'>Please <Link to='/login' className='dark-green'>login</Link> or <Link to='/register' className='dark-green'>sign up</Link> for full access of the dashboard.</h3>
  }


  return (
    
    <div className='ml3 relative vh-100 overflow-hidden'>
      
      {Auth.isAuthenticated() && 
      <div className='mt6 mt4-l mr3-l ml3-l'>
        
        <div className='flex flex-row-l flex-column items-center'>
          <h2 className='mr4-l'>{Auth.getUser().username}'s Dahsboard</h2>
          <Link className='link black' to='/'><button className='small-button pointer grow'>Back to Search</button></Link>
        </div>

        <div className='mt3-l mb3-l'>
          <h3 className='black bb pa2'>Public Transport Routes: </h3>
          {userData[0].publicRoutes.map((direction, i) => {
            return <div key={i} className='mb2'>
              <Link
                className='link avenir dark-green grow mr3-l'
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
                className='small-button pointer grow'
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
            return <div key={i} className='mb2'>
              <Link
                className='link avenir dark-green grow mr3-l'
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
                className='small-button pointer grow'
                value={direction.travelBy}
                id={direction.id}
                onClick={(e) => handleDeletePublic(e)}
              >Delete Route ✖️</button>
            </div>
          })}
        </div>

        
        <div className='mt3-l mb3-l'>
          <h3 className='black bb pa2'>Cycle Routes: </h3>
          {userData[0].cycleRoutes.map((direction, i) => {
            return <div key={i} className='mb2'>
              <Link
                className='link avenir dark-green grow mr3-l'
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
                className='small-button pointer grow'
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
