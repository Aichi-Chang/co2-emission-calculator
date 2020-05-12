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
      .catch(err => setErrors(err))
  }

  function errorPostcodes() {
    if (latLng.result[0].result) {
      return null
    } else {
      return <p className='red avenir flex justify-center'>Oops, the postcodes doesn't exist.</p>
    }
  }



  return (
    <div>
      {/* {Auth.isAuthenticated() && <h3 className='ma3-l ma2 black'>Hello, {Auth.getUser().username}</h3>} */}


      <div className='flex flex-column items-center'>

        <div className='mt5 mr3 ml3 mb5-l mw6 mw9-l mb4 ba pa4 bg-white'>

          <h2 className='mt5 '>Please Enter the Postcodes:</h2>

          <form 
            className='flex flex-column justify-center'
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className='bb input-style ma3 primary-green'
              placeholder = 'From...'
              required = {true}
              name = 'postcodeFrom'
              onChange={(elem) => handleChang(elem)}
            />
            <input
              className='bb input-style ma3 primary-green'
              placeholder = 'To...'
              required = {true}
              name= 'postcodeTo'
              onChange={(elem) => handleChang(elem)}
            />
            <button className='pointer button grow ma3'>
              Search
            </button>
          </form>

          {latLng && latLng.result ? errorPostcodes() : null} 

        </div>
        
        <PostcodesContext.Provider value={postcodes}>
          <TFLresult 
            postcodes={postcodes}
            latLng={latLng}
          />
        </PostcodesContext.Provider> 
       


      </div>

    </div>
    
  )
}
