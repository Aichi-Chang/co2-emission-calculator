import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import Auth from '../lib/Auth'



export default function SingleRoute(props) {

  const [data, setData] = useState()

  console.log(props)

  useEffect(() => {
    axios.get(`/api/routes/${props.location.type}/${props.match.params.id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => setData(res.data))
  }, [])


  return (
    <div>
      <button><Link to='/user'>Dashboard</Link></button>
      <button><Link to='/'>Back to Search</Link></button>
      
    </div>
  )
}
