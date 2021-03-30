import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import { formatRelative } from 'date-fns'

import '@reach/combobox/styles.css'

const libraries = ['places']
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}
const center = {
  lat: 43.320904,
  lng: 21.89576,
}

export const Map = (props) => {
  const { eventArray, setLongitude, setLatitude } = props
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEbMl51eshDuU7zH8SFgkkuTbd4AjGeys',
    libraries,
  })
  const [selectedMarker, setSelectedMarker] = useState(null)

  const onMapClick = useCallback((ev) => {
    setLongitude(ev.latLng.lng())
    setLatitude(ev.latLng.lat())
  }, [])

  const mapRef = useRef()
  const onMapLoad = useEffect((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {eventArray.map(
          (marker) => (
            console.log('hey'),
            console.log(marker),
            (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
                onClick={() => {
                  setSelectedMarker(marker)
                }}
              />
            )
          )
        )}
        {selectedMarker ? (
          <InfoWindow
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
            onCloseClick={() => {
              setSelectedMarker(null)
            }}
          >
            <div>
              <h2>Hello</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}
