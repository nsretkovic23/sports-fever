import React, { useState, useContext } from 'react'
import { Map } from '../Maps/GoogleMap'
import { CreateEventContext } from './CreateEvent'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../actions/event'
import { Form } from './Form'

export const options = [
  { value: 'fudbal', label: 'Fudbal' },
  { value: 'kosarka', label: 'Kosarka' },
  { value: 'odbojka', label: 'Odbojka' },
  { value: 'hokej', label: 'Hokej' },
]

export const EventForm = () => {
  const { event, setEvent } = useContext(CreateEventContext)
  const user = JSON.parse(localStorage.getItem('profile'))
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setEvent({ ...event, [name]: value })
  }

  const clear = () => {
    setEvent({
      title: '',
      description: '',
      date: '',
      free_spots: '',
      sport: '',
    })
    setLongitude('')
    setLatitude('')
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
      const newEvent = {
        ...event,
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
  if (!user?.result?.name) {
    return <h1>Sign in if you want to create event.</h1>
  }

  return (
    <>
      <article className='form'>
        <h2>Create your own event</h2>
        <Form
          event={event}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          longitude={longitude}
          latitude={latitude}
        />
      </article>
      <Map setLongitude={setLongitude} setLatitude={setLatitude} />
    </>
  )
}
