import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import DateFnsUtils from '@date-io/date-fns'

import 'react-calendar/dist/Calendar.css'

import TFLresult from './TFLresult'
import Picker from './Picker'



export default function Postcodes(props) {

  const [postcodes, setPostcodes] = useState({
    postcodeFrom: '',
    postcodeTo: ''
  })
  const [latLng, setLatLng] = useState()

  const [date, setDate] = useState(null)

  
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

        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Picker 
            updateDate={setDate}
          />
        </MuiPickersUtilsProvider> */}
        <button>
          Get the info
        </button>
      </form>

      
      
      <TFLresult 
        // date={date}
        postcodes={postcodes}
        latLng={latLng}
        // latitudeFrom={latLng ? latLng.result[0].result.latitude : null}
        // longitudeFrom={latLng ? latLng.result[0].result.longitude : null}
        // latitudeTo={latLng ? latLng.result[1].result.latitude : null}
        // longitudeTo={latLng ? latLng.result[1].result.longitude : null}
      />

    </div>
  )
}
