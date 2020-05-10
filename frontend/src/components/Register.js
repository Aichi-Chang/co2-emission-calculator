import React, { useState } from 'react'
import axios from 'axios'


export default function Register(props) {


  const [show, setShow] = useState(true)

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
    // setErrors(errors => ({
    //   ...errors, [elem.target.name]: ''
    // }))
  }

  function handleSubmit(elem) {
    elem.preventDefault()
    axios.post('/api/users/register/', data)
      .then(() => {
        props.history.push('/login')
      })
      .catch(err => setErrors(err.response.data))
  }

  function handleTick () {
    if (show === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  return (
    <div className='relative vh-100 wh-100'>
      <div className='flex items-center justify-center'>
        <form 
          className='flex flex-column mt6-l mt4 w-40-l'
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className='ma3-l ma2'
            onChange={(e) => handleChange(e)}
            type='text'
            name='username'
            required={true}
            placeholder='User Name'
          />
          {errors.message && <small>{errors.message.username}</small>}
          <input
            className='ma3-l ma2'
            onChange={(e) => handleChange(e)}
            type='email'
            name='email'
            required={true}
            placeholder='Email'
          />
          {errors.message && <small>{errors.message.email}</small>}
          <input
            className='ma3-l ma2'
            onChange={(e) => handleChange(e)}
            type={show ? 'password' : 'text'}
            name='password'
            required={true}
            placeholder='Password'
          />
          {errors.message && <small>{errors.message.password}</small>}
          <input
            className='ma3-l ma2'
            onChange={(e) => handleChange(e)}
            type={show ? 'password' : 'text'}
            name='password_confirmation'
            required={true}
            placeholder='Confirm Password'
          />
          {errors.message && <small>{errors.message.password_confirmation}</small>}
          <button className='ma3-l ma2 pointer button grow'>Create Account</button>
        </form>
      </div>
   
      <button 
        className='absolute pointer small-button grow show-button-position-2'
        onClick={() => handleTick()}
      >
        Show Password
      </button>
    </div>
  )
}


