import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'




export default function Nav() {


  function handleLogout() {
    Auth.logOut()
    window.location.reload()
  }

  return (
    <div className='fixed z-2'>

      {Auth.isAuthenticated() && <button className='pointer button grow ma3' onClick={() => handleLogout()}>Log Out</button>}
      {!Auth.isAuthenticated() && <button className='pointer button grow ma3'><Link class='link black' to='/login'>Log in</Link></button>}
      {!Auth.isAuthenticated() && <button className='pointer button grow ma3'><Link class='link black'to='/register'>Sign Up</Link></button>}
      {Auth.isAuthenticated() && <button className='pointer button grow ma3'><Link class='link black' to='/user'>Dashboard</Link></button>}

    </div>
  )
}
