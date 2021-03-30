import React, { useState } from 'react'
import { Map } from './GoogleMap'

export const EventForm = (props) => {
  const { event, setEvent, eventArray, setEventArray } = props

  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      event.title &&
      event.description &&
      event.date &&
      event.availableSpots &&
      longitude !== '' &&
      latitude !== ''
    ) {
      const newEvent = {
        ...event,
        id: new Date().getTime().toString(),
        lng: longitude,
        lat: latitude,
      }
      setEventArray([...eventArray, newEvent])
      setEvent({
        title: '',
        description: '',
        date: '',
        availableSpots: '',
      })
      setLongitude('')
      setLatitude('')
    }
  }

  return (
    <>
      <article className='form'>
        <h2>Create your own event</h2>
        <form>
          <div className='form-element'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={event.title}
              onChange={handleChange}
            />
          </div>
          <div className='form-element'>
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              name='description'
              value={event.description}
              onChange={handleChange}
              rows='6'
              cols='50'
            >
              Enter description...
            </textarea>
          </div>
          <div className='form-element'>
            <label htmlFor='date'>Date:</label>
            <input
              type='date'
              id='date'
              name='date'
              value={event.date}
              onChange={handleChange}
            />
          </div>
          <div className='form-element'>
            <label htmlFor='availableSpots'>Available spots:</label>
            <input
              type='number'
              id='availableSpots'
              name='availableSpots'
              value={event.availableSpots}
              onChange={handleChange}
            />
          </div>
          <div className='form-element'>
            <label htmlFor='lat'>Latitude: {latitude}</label>
          </div>
          <div className='form-element'>
            <label htmlFor='lng'>Longitude: {longitude}</label>
          </div>
          <button type='submit' className='submitBtn' onClick={handleSubmit}>
            Create
          </button>
        </form>
      </article>
      <article>
        {eventArray.map((event) => {
          return (
            <>
              <h1>{event.title}</h1>
              <h1>{event.lat}</h1>
              <h1>{event.lng}</h1>
            </>
          )
        })}
      </article>
      <Map
        eventArray={eventArray}
        setLongitude={setLongitude}
        setLatitude={setLatitude}
      />
    </>
  )
}
