import React, { useRef, useCallback } from 'react'
import { Search, Locate } from './MapFunctions'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

import { libraries, mapContainerStyle, mapInEventStyle } from './MapConst'
import '@reach/combobox/styles.css'
import useStyles from './styles'

export const MapWithSingleEvent = ({ event }) => {
  const classes = useStyles()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEbMl51eshDuU7zH8SFgkkuTbd4AjGeys',
    libraries,
  })
  const mapRef = useRef()
  const center = {
    lat: event.lat,
    lng: event.lng,
  }
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(15)
  }, [])

  if (loadError) return 'Error loading map'
  if (!isLoaded) return 'Loading Map'

  return (
    <div className={classes.mapInEvent}>
      <GoogleMap
        id='map'
        mapContainerStyle={mapInEventStyle}
        zoom={14}
        center={center}
        onLoad={onMapLoad}
      >
        {event ? drawMarker(event) : null}
      </GoogleMap>
    </div>
  )
}

function drawMarker(marker) {
  return (
    <Marker
      key={`${marker.lat}-${marker.lng}`}
      position={{
        lat: marker.lat,
        lng: marker.lng,
      }}
      icon={{
        url: `/${marker.sport}.png`,
        origin: new window.google.maps.Point(0, 0),
        scaledSize: new window.google.maps.Size(80, 80),
      }}
    />
  )
}
