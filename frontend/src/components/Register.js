import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function Register(props) {


  const [data, setData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [errors, setErrors] = useState({
    errors: ''
  })


  function handleChange(elem) {
    elem.persist()
    setData(data => ({
      ...data, [elem.target.name]: elem.target.value
    }))
    setErrors(errors => ({
      ...errors, [elem.target.name]: ''
    }))
  }

  function handleSubmit(elem) {
    elem.preventDefault()
    axios.post('/api/users/register/', data)
      .then(() => {
        props.history.push('/login')
      })
      .catch(err => setErrors(err.reponse.data))
  }


  return (
    <div>
      
    </div>
  )
}


