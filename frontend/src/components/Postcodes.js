import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import TFLresult from './TFLresult'
import Auth from '../lib/Auth'

export const PostcodesContext = React.createContext()
export const RoutesContext = React.createContext()



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



  return (
    <div className='flex flex-column items-center'>

      <div className='mt6-l mt5 mr3 ml3 mw6 mw9-l'>
        {Auth.isAuthenticated() && <h2>Hello, {Auth.getUser().username}!</h2>}

        <h2 className='mt5 '>Please Enter the Postcodes:</h2>

        <form 
          className='flex flex-column justify-center'
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className='bb input ma3'
            placeholder = 'From...'
            required = {true}
            name = 'postcodeFrom'
            onChange={(elem) => handleChang(elem)}
          />
          <input
            className='bb input ma3'
            placeholder = 'To...'
            required = {true}
            name= 'postcodeTo'
            onChange={(elem) => handleChang(elem)}
          />
          <button className='pointer button grow ma3'>
            Search
          </button>
        </form>

      </div>
      
      <PostcodesContext.Provider value={postcodes}>
        <TFLresult 
          postcodes={postcodes}
          latLng={latLng}
        />
      </PostcodesContext.Provider>

      


    </div>

    
  )
}
