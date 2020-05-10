import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'




export default function Nav() {


  function handleLogout() {
    Auth.logOut()
    window.location.reload()
  }

  return (
    <div className='vw-100'>

      <div className='flex flex-row justify-end'>
        {Auth.isAuthenticated() && <button className='pointer button grow ma3-l ma2' onClick={() => handleLogout()}>Log Out</button>}
        {!Auth.isAuthenticated() && <Link className='link black' to='/login'><button className='pointer button grow ma3-l ma2'>Log in</button></Link>}
        {!Auth.isAuthenticated() && <Link className='link black'to='/register'><button className='pointer button grow ma3-l ma2'>Sign Up</button></Link>}
        {Auth.isAuthenticated() && <Link className='link black' to='/user'><button className='pointer button grow ma3-l ma2'>Dashboard</button></Link>}
      </div>


    </div>
  )
}
