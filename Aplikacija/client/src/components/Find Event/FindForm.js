import React, { useState } from 'react'
import { MapWithEvents } from '../Maps/MapWithEvents'
import { options } from '../Create Event/EventForm'
import { useSelector } from 'react-redux'
import { center } from '../Maps/MapConst'

export const FindForm = () => {
  const eventArray = useSelector((state) => state.events)
  const [find, setFind] = useState({
    date: '',
    free_spots: '',
    sport: '',
    findEvent: '',
  })
  const [event, setEvent] = useState({
    date: '',
    free_spots: '',
    sport: '',
  })

  const [radius, setRadius] = useState({
    lat: center.lat,
    lng: center.lng,
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEvent({ ...event, findEvent: '' })
    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (event.date && event.free_spots > 0 && event.sport) {
      setFind({ ...event, findEvent: 'true' })
    }
  }

  const resetEvent = (ev) => {
    ev.preventDefault()
    setFind({ date: '', free_spots: '', sport: '', findEvent: '' })
  }

  return (
    <>
      <form>
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
        <button type='submit' className='submitBtn' onClick={handleSubmit}>
          Find
        </button>
        <button type='button' className='resetBtn' onClick={resetEvent}>
          Show All
        </button>
      </form>
      <div>
        <MapWithEvents
          eventArray={eventArray}
          find={find}
          radius={radius}
          setRadius={setRadius}
        />
      </div>
    </>
  )
}