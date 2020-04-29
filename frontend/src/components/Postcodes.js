import React, { useState } from 'react'
import axios from 'axios'

import TFLresult from './TFLresult'
import Auth from '../lib/Auth'



export default function Postcodes() {

  const [postcodes, setPostcodes] = useState({
    postcodeFrom: '',
    postcodeTo: ''
  })
  const [latLng, setLatLng] = useState()
  
  const [errors, setErrors] = useState({
    errors: ''
  })



  function handleChang(elem) {
    elem.persist()
    setPostcodes(postcode => ({ ...postcode, [elem.target.name]: elem.target.value }))
  }

  const data = { postcodes: [postcodes.postcodeFrom, postcodes.postcodeTo] }

  function handleSubmit(elem) {
    elem.preventDefault()
    axios.post('https://api.postcodes.io/postcodes', data)
      .then(res => {
        setLatLng(res.data)
      })
      .catch(err => setErrors(err.response.data))
  }

  // console.log(latLng)

  return (
    <div>
      {Auth.isAuthenticated() && <h2>Hello, {Auth.getUser().username}!</h2>}
      <h3>Please enter the postcode:</h3>
      <form 
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          placeholder = 'From...'
          required = {true}
          name = 'postcodeFrom'
          onChange={(elem) => handleChang(elem)}
        />
        <input
          placeholder = 'To...'
          required = {true}
          name= 'postcodeTo'
          onChange={(elem) => handleChang(elem)}
        />
        <button>
          Get the info
        </button>
      </form>

      
      
      <TFLresult 
        postcodes={postcodes}
        latLng={latLng}
      />

    </div>
  )
}
