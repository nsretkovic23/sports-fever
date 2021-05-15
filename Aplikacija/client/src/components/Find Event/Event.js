import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getEvent } from '../../actions/event'
export const Event = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const location = useLocation()
  const { _id } = location.state
  const event = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvent(_id))
  }, [_id, dispatch])

  return (
    <>
      <div>
        {user?.result?.googleId === event.creator ||
        user?.result?._id === event.creator ? (
          <p>Its your event, you can change it</p>
        ) : null}
      </div>
      <div>
        <h1>{event?.title}</h1>
        <p>{event?.description}</p>
        <p>{event?.date}</p>
        <p>{event?.sport}</p>
        <p>{event?.free_spots}</p>
      </div>
    </>
  )
}
