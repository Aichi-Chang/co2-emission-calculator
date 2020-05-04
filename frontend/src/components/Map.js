import React, { useState } from 'react'
import MapGL, {Marker, Popup} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

require('dotenv').config()

const token = process.env.REACT_MAP_KEY




export default function Map(props) {

  const [viewport, setViewport] = useState({
    width: 570,
    height: 300,
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 13,
    bearing: 0,
    pitch: 0
  })



  // function renderMarker() {

  // }

  return (


    <div>
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={token}
      >
      </MapGL> 
    </div>
  )
}
