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
    <div>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {eventArray.map((marker) => (
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
        ))}
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
              <h2>{selectedMarker.title}</h2>
              <p>Desc: {selectedMarker.description}</p>
              <p>Date: {selectedMarker.date}</p>
              <p>Available Spots: {selectedMarker.availableSpots}</p>
              <button>+Join</button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.320904, lng: () => 21.89576 },
      radius: 200000,
    },
  })

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder='Enter a location'
        ></ComboboxInput>
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

function Locate({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => null
        )
      }}
    >
      Geolocation
    </button>
  )
}
