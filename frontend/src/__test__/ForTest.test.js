import React from 'react'
import ReactDOM from 'react-dom'
import Postcodes from '../components/Postcodes'


describe('Postcodes', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Postcodes />, div)
  })
})