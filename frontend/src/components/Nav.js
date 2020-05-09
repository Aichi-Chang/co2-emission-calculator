import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'




export default function Nav() {


  function handleLogout() {
    Auth.logOut()
    window.location.reload()
  }

  return (
    <div className='flex flex-wrap-l items-center-l justify-between-l flex-column-reverse-m z-1'>

      <div className='black'>
        {Auth.isAuthenticated() && <h3 className='ma3-l ma2'>Hello, {Auth.getUser().username}</h3>}
      </div>

      <div className=''>
        {Auth.isAuthenticated() && <button className='pointer button grow ma3-l ma2' onClick={() => handleLogout()}>Log Out</button>}
        {!Auth.isAuthenticated() && <button className='pointer button grow ma3-l ma2'><Link className='link black' to='/login'>Log in</Link></button>}
        {!Auth.isAuthenticated() && <button className='pointer button grow ma3-l ma2'><Link className='link black'to='/register'>Sign Up</Link></button>}
        {Auth.isAuthenticated() && <button className='pointer button grow ma3-l ma2'><Link className='link black' to='/user'>Dashboard</Link></button>}
      </div>


    </div>
  )
}
