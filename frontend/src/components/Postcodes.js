import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Postcodes(props) {

  const [postcodes, setPostcodes] = useState({
    postcodeFrom: '',
    postcodeTo: ''
  })
  const [latLng, setLatLng] = useState(null)
  
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
        props.history.push('/result')
      })
      .catch(err => setErrors(err.response.data))
  }
 

  console.log(latLng)
  



  return (
    <div>
      <h1>Please enter the postcode:</h1>
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

      {/* <div>
        {latLng ?
          latLng.result.map(lat => {
            return lat.result.latitude
          })
          : null}
      </div> */}

    </div>
  )
}
