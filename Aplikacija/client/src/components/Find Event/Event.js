import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {
  getEvent,
  deleteEvent,
  updateEvent,
  joinEvent,
} from '../../actions/event'
import { Form } from '../Create Event/Form'

export const Event = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const location = useLocation()
  const { _id } = location.state
  const event = useSelector((state) => state.events)
  const [update, setUpdate] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const [participant, setParticipant] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    free_spots: '',
    sport: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (event) setNewEvent(event)
  }, [event])

  useEffect(() => {
    dispatch(getEvent(_id))
    console.log('fetching')
  }, [_id, dispatch, refresh])

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setNewEvent({ ...newEvent, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.description && newEvent.free_spots > 0) {
      dispatch(updateEvent(event._id, newEvent))
      setUpdate(null)
      setRefresh((prev) => !prev)
    } else {
      alert('Wrong inputs')
    }
  }

  const joinThisEvent = (e) => {
    e.preventDefault()
    let uID = ''
    if (user?.result?._id) uID = user?.result?._id
    else uID = user?.result?.googleId
    const data = {
      userId: uID,
      eventId: event._id,
    }
    dispatch(joinEvent(data))
  }

  return (
    <>
      <div>
        {user?.result?.googleId === event.creator ||
        user?.result?._id === event.creator ? (
          <div>
            <button
              onClick={(ev) => {
                joinThisEvent(ev)
              }}
            >
              Update
            </button>
            <button
              onClick={(ev) => {
                ev.preventDefault()
                dispatch(deleteEvent(_id))
                history.push('/')
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      <div>
        <h1>{event?.title}</h1>
        <p>{event?.description}</p>
        <p>{event?.date}</p>
        <p>{event?.sport}</p>
        <p>{event?.free_spots}</p>
      </div>
      <div>
        {!event?.participants?.some(
          (item) =>
            item.id === user?.result?.googleId || item.id === user?.result?._id
        ) ? (
          <button
            onClick={(ev) => {
              joinThisEvent(ev)
            }}
          >
            +Join
          </button>
        ) : (
          <button>Chat</button>
        )}
      </div>
      {update ? (
        <div>
          <Form
            event={newEvent}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            longitude={newEvent.longitude}
            latitude={newEvent.latitude}
          />
        </div>
      ) : null}
    </>
  )
}
