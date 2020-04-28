import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'




export default function Login(props) {

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    errors: ''
  })

  const [show, setShow] = useState(true)





  function handleChange(elem) {
    elem.persist()
    setData(data => ({ ...data, [elem.target.name]: elem.target.value }))
    // setErrors(errors => ({ ...errors, [elem.target.name]: '' }))
    
  }

  async function handleSubmit(elem) {
    elem.preventDefault()
    await axios.post('/api/users/login/', data)
      .then(res => {
        Auth.setToken(res.data.token)
        Auth.setUser(res.data.user)
        props.history.push('/')
        window.location.reload()
      })
      .catch(err => setErrors(err.response.data))
  }

  function handleTick() {
    return show ? setShow(false) : setShow(true)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button>Log In</button>
      </form>
      <button onClick={() => handleTick()}>Show Password</button>
    </div>
  )
}
