import React, { useState, useEffect } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

require('dotenv').config()

const token = process.env.REACT_MAP_KEY




export default function Map(props) {

  const [viewport, setViewport] = useState({
    width: 800,
    height: 400,
    latitude: 51.5074,
    longitude: -0.1039,
    zoom: 11
  })

  const [cordi, setCordi] = useState([])


  const data = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: cordinateArr
    }
  }

  useEffect(() => {

    const route = props.route.response.route[0]

    const maneuverLo = `${route.leg[0].maneuver.map(pos => {
      return pos.position.longitude
    })}`.split(',')

    const Lon = maneuverLo.map(num => {
      return parseFloat(num)
    })

    const maneuverLa = `${route.leg[0].maneuver.map(pos => {
      return pos.position.latitude
    })}`.split(',')

    const Lat = maneuverLa.map(num => {
      return parseFloat(num)
    })


    
    setCordi([...Lon, ...Lat])


  }, [props])


  const cordinateArr = []

  for (let i = 0; i < (cordi.length / 2); i++) {
    console.log(cordi)
    console.log(i)
    console.log((cordi.length / 2) + i)
    cordinateArr.push([cordi[i], cordi[(cordi.length / 2) + i]])
  }

  console.log(cordinateArr)


  return (


    <div>
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={token}
      >
        <Source id='route' type='geojson' data={data} />
        <Layer 
          id='route'
          type='line'
          source='route'
          layer={{
            'line-join': 'round',
            'line-cap': 'round'
          }}
          paint={{
            'line-color': '#000',
            'line-width': 8
          }}
        />
      </MapGL> 
    </div>
  )
}
