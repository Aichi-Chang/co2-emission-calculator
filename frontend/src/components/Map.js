import React, { useState, useEffect } from 'react'
import MapGL, { Source, Layer, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


require('dotenv').config()

const token = process.env.REACT_MAP_KEY




export default function Map(props) {


  const [viewport, setViewport] = useState({
    width: 500,
    height: 300,
    latitude: parseFloat(((props.route.response.route[0].waypoint[0].mappedPosition.latitude + props.route.response.route[0].waypoint[1].mappedPosition.latitude) / 2).toFixed(6)),
    longitude: parseFloat(((props.route.response.route[0].waypoint[0].mappedPosition.longitude + props.route.response.route[0].waypoint[1].mappedPosition.longitude) / 2).toFixed(6)),
    zoom: 11
  })
  const [cordi, setCordi] = useState([])
  const [infoHomeS, setInfoHomeS] = useState(props.route.response.route[0].waypoint[0].mappedRoadName)
  const [infoHomeE, setInfoHomeE] = useState(props.route.response.route[0].waypoint[1].mappedRoadName)




  useEffect(() => {

    if (props.route) {
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
    } else {

      setCordi([...props.singleData.maneuverLon, ...props.singleData.maneuverLat])
    }

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




  function renderPopupHomeS() {
    return (infoHomeS && (
      <Popup 
        longitude={props.route.response.route[0].waypoint[0].mappedPosition.longitude} 
        latitude={props.route.response.route[0].waypoint[0].mappedPosition.latitude}
        closeOnClick={false}
        onClose={() => setInfoHomeS(null)} 
      >
        {infoHomeS}
      </Popup>
    )) 
  }

  function renderPopupHomeE() {
    return (infoHomeE && (
      <Popup 
        longitude={props.route.response.route[0].waypoint[1].mappedPosition.longitude} 
        latitude={props.route.response.route[0].waypoint[1].mappedPosition.latitude}
        closeOnClick={false}
        onClose={() => setInfoHomeE(null)}
      >
        {infoHomeE}
      </Popup>
    ))
  }

          


  if (!props) {
    return null
  }

  return (
    <div>
      <MapGL
        {...props.route && { ...viewport }}
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
            'line-color': '#1e2bd8',
            'line-width': 5
          }}
        />

        {renderPopupHomeS()}
        {renderPopupHomeE()}

      </MapGL> 
    </div>
  )
}
