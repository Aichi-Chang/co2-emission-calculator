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
    <div className='relative vh-100 wh-100'>
      <div className='flex items-center justify-center'>
        <form 
          className='flex flex-column mt6-l mt4 w-40-l'
          onSubmit={(e) => handleSubmit(e)}
        >
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
          <button
            className='ma3-l ma2 pointer button grow'
          >
            Log In
          </button>
        </form>
      </div>
      <button 
        className='absolute pointer small-button grow show-button-position'
        onClick={() => handleTick()}
      >Show Password</button>
    </div>
  )
}
