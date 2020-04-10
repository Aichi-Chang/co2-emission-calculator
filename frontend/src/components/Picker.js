import React, { useState, useEffect } from 'react'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import DateFnsUtils from '@date-io/date-fns'
import { createContext } from 'react'




export default function Picker({ updateDate }) {


  const [selectedDate, setSelectedDate] = useState(null)

  // useEffect(() => {
  //   updateDate(selectedDate)
  //   console.log('hi')
  // },[])
  

  // https://stackoverflow.com/questions/54620928/useeffect-hook-not-firing-after-state-change
  // The array you pass as second argument to useEffect only checks if the elements in the array are === to the elements in it in the previous render. 
  function handleChange(e) {
    // console.log(e.getUTCHours() + 1)
    // console.log(e.getUTCMinutes())
    setSelectedDate(e)
    updateDate(e)
  }




  return (

    <div>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          label='Leaving at...'
          inputVariant="outlined"
          value={selectedDate} 
          onChange={(e) => handleChange(e)}
        />
      </MuiPickersUtilsProvider>

    </div>
  )
}
