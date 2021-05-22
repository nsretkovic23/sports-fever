import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search, Locate } from './MapFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from '../../actions/event'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { libraries, mapContainerStyle, center } from './MapConst'
import '@reach/combobox/styles.css'
import { Link } from 'react-router-dom'

export const MapWithEvents = ({ find, radius, setRadius }) => {
  const eventArray = useSelector((state) => state.events)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCEbMl51eshDuU7zH8SFgkkuTbd4AjGeys',
    libraries,
  })
  const [selectedMarker, setSelectedMarker] = useState(null)

  const dispatch = useDispatch()
  const mapRef = useRef()

  useEffect(() => {
    if (find.findEvent === false) {
      const time = new Date()
      const date = time.toISOString().split('T')
      dispatch(getEvents(radius.lng, radius.lat, 'all', date[0], 0, 'all'))
    } else {
      let price
      let date
      let free_spots
      let sport
      if (find.price === '') {
        price = 'all'
      } else {
        price = find.price
      }
      if (find.date === '') {
        const time = new Date()
        date = time.toISOString().split('T')
      } else {
        date = find.date.split('T')
      }
      if (find.free_spots === '') {
        free_spots = 0
      } else {
        free_spots = find.free_spots
      }
      if (find.sport === '') {
        sport = 'all'
      } else {
        sport = find.sport
      }
      dispatch(
        getEvents(radius.lng, radius.lat, sport, date[0], free_spots, price)
      )
    }
  }, [radius, find])

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
        {Array.isArray(eventArray) && eventArray.length
          ? eventArray
              .filter((el) => el.free_spots > 0)
              .map((marker) => drawMarker(marker, setSelectedMarker))
          : null}
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
              <p>Price: {selectedMarker.price}</p>
              <button>
                <Link
                  to={{
                    pathname: `/singleEvent`,
                    state: {
                      _id: selectedMarker._id,
                    },
                  }}
                >
                  +Details
                </Link>
              </button>
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
