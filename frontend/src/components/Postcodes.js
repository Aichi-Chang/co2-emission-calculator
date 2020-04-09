import React, { useState, useEffect } from 'react'
import axios from 'axios'

import TFLresult from './TFLresult'



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
        
        // props.history.push('/result')
      })
      .catch(err => setErrors(err.response.data))
  }
 

  // console.log(latLng)
  



  return (
    <div>

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
        latitudeFrom={latLng ? latLng.result[0].result.latitude : null}
        longitudeFrom={latLng ? latLng.result[0].result.longitude : null}
        latitudeTo={latLng ? latLng.result[1].result.latitude : null}
        longitudeTo={latLng ? latLng.result[1].result.longitude : null}
        // url={`https://api.tfl.gov.uk/journey/journeyresults/${latLng.result[0].result.latitude},-0.146452/to/51.489864,-0.040245?nationalsearch=false&date=20200408&time=1530&timeis=departing&useMultiModalCall=true`}
      />

      {/* <div>
        {latLng ? latLng.result[0].result.latitude : null}
      </div> */}

    </div>
  )
}
