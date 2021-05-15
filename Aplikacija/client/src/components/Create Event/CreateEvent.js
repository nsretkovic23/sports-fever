import React, { useState } from 'react'
import { EventForm } from './EventForm'

export const CreateEventContext = React.createContext()

export const CreateEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    title: '',
    description: '',
    date: '',
    free_spots: '',
    sport: '',
  })
  const [eventArray, setEventArray] = useState([])

  return (
    <CreateEventContext.Provider
      value={{
        event,
        setEvent,
        eventArray,
        setEventArray,
      }}
    >
      <EventForm />
    </CreateEventContext.Provider>
  )
}
