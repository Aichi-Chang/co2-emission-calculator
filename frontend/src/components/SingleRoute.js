import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleRoute(props) {

  console.log(props)

  return (
    <div>
      <button><Link to='/user'>Dashboard</Link></button>
      <button><Link to='/'>Back to Search</Link></button>
      
    </div>
  )
}
