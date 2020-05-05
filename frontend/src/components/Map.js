import React, { useState, useEffect } from 'react'
import MapGL, { Source, Layer, Popup } from 'react-map-gl'
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


  const coordinateArr = []
  for (let i = 0; i < (cordi.length / 2); i++) {
    coordinateArr.push([cordi[i], cordi[(cordi.length / 2) + i]])
  }


  const data = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinateArr
    }
  }





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
            'line-color': '#a83a32',
            'line-width': 5
          }}
        />
        {props && 
        <div>
          <Popup longitude={props.route.response.route[0].waypoint[0].mappedPosition.longitude} latitude={props.route.response.route[0].waypoint[0].mappedPosition.latitude} closeOnClick={false}>
            {props.route.response.route[0].waypoint[0].mappedRoadName}
          </Popup>
          <Popup longitude={props.route.response.route[0].waypoint[1].mappedPosition.longitude} latitude={props.route.response.route[0].waypoint[1].mappedPosition.latitude} closeOnClick={false}>
            {props.route.response.route[0].waypoint[1].mappedRoadName}
          </Popup>
        </div>
          
        }
      </MapGL> 
    </div>
  )
}
