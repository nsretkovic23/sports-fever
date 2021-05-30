import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search, Locate } from './MapFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from '../../actions/event'
import { makeStyles } from '@material-ui/core/styles'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { Typography, Paper, Button } from '@material-ui/core'
import { libraries, mapContainerStyle, center } from './MapConst'
import '@reach/combobox/styles.css'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  map: {
    marginTop: '30px',
    marginRight: '10px',
    marginBottom: '15px',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  buttons: {
    backgroundColor: '#04ECF0',
    marginTop: '20px',
    marginBottom: '5px',
    alignSelf: 'center',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
  paper: {
    padding: theme.spacing(3),
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  typography: {
    fontSize: '20px',
    padding: theme.spacing(1),
  },
}))

export const MapWithEvents = ({ find, radius, setRadius }) => {
  const eventArray = useSelector((state) => state.events)
  const classes = useStyles()
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
    <div className={classes.map}>
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
            <>
              <Typography variant='h4' className={classes.title}>
                {selectedMarker.title}
              </Typography>
              <Typography className={classes.typography}>
                Date: {selectedMarker.date.split('T')[0]}
              </Typography>
              <Typography className={classes.typography}>
                Available Spots: {selectedMarker.free_spots}
              </Typography>
              <Typography className={classes.typography}>
                Price: {selectedMarker.price}
              </Typography>
              <Button className={classes.buttons} fullWidth>
                <Link
                  to={{
                    pathname: `/singleEvent/.${selectedMarker._id}`,
                  }}
                  className={classes.link}
                >
                  +Details
                </Link>
              </Button>
            </>
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
