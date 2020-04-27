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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          type='text'
          name='username'
          required={true}
          placeholder='User Name'
        />
        {errors.message && <small>{errors.message.username}</small>}
        <input
          onChange={(e) => handleChange(e)}
          type='email'
          name='email'
          required={true}
          placeholder='Email'
        />
        {errors.message && <small>{errors.message.email}</small>}
        <input
          onChange={(e) => handleChange(e)}
          type={show ? 'password' : 'text'}
          name='password'
          required={true}
          placeholder='Password'
        />
        {errors.message && <small>{errors.message.password}</small>}
        <input
          onChange={(e) => handleChange(e)}
          type={show ? 'password' : 'text'}
          name='password_confirmation'
          required={true}
          placeholder='Confirm Password'
        />
        {errors.message && <small>{errors.message.password_confirmation}</small>}
        <button>Create Account</button>
      </form>
      <button onClick={() => handleTick()}>
        Show Password
      </button>
    </div>
  )
}


