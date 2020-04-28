import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'




export default function Nav() {


  function handleLogout() {
    Auth.logOut()
    window.location.reload()
  }

  return (
    <div>
      {Auth.isAuthenticated() && <button onClick={() => handleLogout()}>Log Out</button>}
      {!Auth.isAuthenticated() && <Link to='/login'>Log in</Link>}
      {!Auth.isAuthenticated() && <Link to='/register'>Sign Up</Link>}

    </div>
  )
}
