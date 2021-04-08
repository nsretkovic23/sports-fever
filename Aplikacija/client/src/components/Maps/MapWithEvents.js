import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search, Locate } from './MapFunctions'
import { useSelector } from 'react-redux'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { libraries, mapContainerStyle, center } from './MapConst'
import '@reach/combobox/styles.css'

export const MapWithEvents = ({ eventArray, find, radius, setRadius }) => {
  //const eventArray = useSelector((state) => state.events)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEbMl51eshDuU7zH8SFgkkuTbd4AjGeys',
    libraries,
  })
  const [selectedMarker, setSelectedMarker] = useState(null)

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(15)
    setRadius({ lat: lat, lng: lng })
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
        onLoad={onMapLoad}
      >
        {find.findEvent
          ? eventArray
              .filter((ev) => ev.sport === find.sport)
              .filter(
                (m) =>
                  parseFloat(m.lat) <= parseFloat(radius.lat) + 0.21 &&
                  parseFloat(m.lat) >= parseFloat(radius.lat) - 0.21 &&
                  parseFloat(m.lng) <= parseFloat(radius.lng) + 0.21 &&
                  parseFloat(m.lng) >= parseFloat(radius.lng) - 0.21
              )
              .map((marker) => drawMarker(marker, setSelectedMarker))
          : eventArray
              .filter(
                (m) =>
                  parseFloat(m.lat) <= parseFloat(radius.lat) + 0.21 &&
                  parseFloat(m.lat) >= parseFloat(radius.lat) - 0.21 &&
                  parseFloat(m.lng) <= parseFloat(radius.lng) + 0.21 &&
                  parseFloat(m.lng) >= parseFloat(radius.lng) - 0.21
              )
              .map((marker) => drawMarker(marker, setSelectedMarker))}
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
              <p>Available Spots: {selectedMarker.free_spots}</p>
              <button>+Join</button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}

function drawMarker(marker, setSelectedMarker) {
  return (
    <Marker
      key={`${marker.lat}-${marker.lng}`}
      position={{
        lat: marker.lat,
        lng: marker.lng,
      }}
      onClick={() => {
        setSelectedMarker(marker)
      }}
      icon={{
        url: `/${marker.sport}.png`,
        origin: new window.google.maps.Point(0, 0),
        scaledSize: new window.google.maps.Size(80, 80),
      }}
    />
  )
}
