import React, { useState, useContext } from 'react'
import { Map } from '../Maps/GoogleMap'
import { CreateEventContext } from './CreateEvent'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../actions/event'
import { Form } from './Form'
import { Grid } from '@material-ui/core'

export const EventForm = () => {
  const { event, setEvent } = useContext(CreateEventContext)
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))
  const [selectedDate, handleDateChange] = useState(new Date())
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
      console.log(newEvent)
      dispatch(createEvent(newEvent))
      clear()
    } else {
      alert('Wrong inputs')
    }
  }

  const clear = () => {
    setEvent({
      title: '',
      description: '',
      date: '',
      free_spots: '',
      sport: '',
      price: '',
    })
    setLongitude('')
    setLatitude('')
  }

  if (!user?.result?.name) {
    return <h1>Sign in if you want to create event.</h1>
  }

  /*console.log(selectedDate.toISOString())
  console.log('-')
  console.log(event.date)
  */
  return (
    <>
      <Grid container direction='row'>
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
