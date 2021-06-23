import React, { useState, useContext } from 'react'
import { Map } from '../Maps/GoogleMap'
import { CreateEventContext } from './CreateEvent'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../actions/event'
import { Form } from './Form'
import { Grid, Typography } from '@material-ui/core'
import { Notification } from '../Notifications/Notification'
import classNames from 'classnames'
import useStyles from './style'

export const EventForm = () => {
  const { event, setEvent } = useContext(CreateEventContext)
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [selectedDate, handleDateChange] = useState(new Date())
  const user = JSON.parse(localStorage.getItem('profile'))
  const [notification, setNotification] = useState({
    show: false,
    title: '',
    messageText: '',
    typeOfNotification: '',
  })
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      event.title &&
      event.description &&
      event.free_spots > 0 &&
      event.time &&
      selectedDate &&
      latitude &&
      longitude
    ) {
      let creator = ''
      if (user?.result?._id) creator = user?.result?._id
      else creator = user?.result?.googleId
      const newDate = selectedDate.toISOString().split('T')
      const newEvent = {
        ...event,
        date: newDate[0],
        id: new Date().getTime().toString(),
        lng: longitude,
        lat: latitude,
        creator: creator,
      }
      dispatch(createEvent(newEvent))
      clearPreviousData()
    } else {
      setNotification({
        show: true,
        titleText: 'Wrong inputs',
        messageText: 'Some field are left blank',
        typeOfNotification: 'warning',
      })
    }
  }

  const clearPreviousData = () => {
    setEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      free_spots: '',
      sport: '',
      price: '',
    })
    setLongitude('')
    setLatitude('')
  }

  if (!user?.result?.name) {
    return (
      <Typography variant='h5' align='center'>
        Sign in if you want to create event
      </Typography>
    )
  }

  return (
    <>
      <Grid container direction='row' className={classes.container}>
        {notification.show ? (
          <Notification
            notification={notification}
            setNotification={setNotification}
          ></Notification>
        ) : null}
        <Grid item xs={3}>
          <Form
            event={event}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            longitude={longitude}
            latitude={latitude}
            buttonTitle={'Create'}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={9}>
          <Map setLongitude={setLongitude} setLatitude={setLatitude} />
        </Grid>
      </Grid>
    </>
  )
}
