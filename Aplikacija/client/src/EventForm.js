import React, { useState, useContext } from 'react'
import { Map } from './GoogleMap'
import { CreateEventContext } from './CreateEvent'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from './actions/event'

const options = [
  { value: 'fudbal', label: 'Fudbal' },
  { value: 'kosarka', label: 'Kosarka' },
  { value: 'odbojka', label: 'Odbojka' },
  { value: 'hokej', label: 'Hokej' },
]

export const EventForm = () => {
  const { event, setEvent, eventArray, setEventArray } = useContext(
    CreateEventContext
  )

  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEvent({ ...event, [name]: value })
  }

  const clear = () => {
    setEvent({
      title: '',
      description: '',
      date: '',
      availableSpots: '',
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
      const newEvent = {
        ...event,
        id: new Date().getTime().toString(),
        lng: longitude,
        lat: latitude,
      }
      dispatch(createEvent(newEvent))
      clear()
    } else {
      alert('Wrong inputs')
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
            <label htmlFor='free_spots'>Available spots:</label>
            <input
              type='number'
              id='free_spots'
              name='free_spots'
              value={event.free_spots}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='sport'>Choose a sport:</label>
            <select
              name='sport'
              id='sport'
              onChange={handleChange}
              value={event.sport}
            >
              {options.map((el) => {
                return <option value={el.value}>{el.label}</option>
              })}
            </select>
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
      <Map
        eventArray={eventArray}
        setLongitude={setLongitude}
        setLatitude={setLatitude}
      />
    </>
  )
}
