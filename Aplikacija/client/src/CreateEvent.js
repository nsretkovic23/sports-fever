import React, { useState } from 'react'
import { EventForm } from './EventForm'

export const CreateEventContext = React.createContext()

export const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    availableSpots: '',
    type: '',
  })
  const [eventArray, setEventArray] = useState([])

  return (
    <CreateEventContext.Provider
      value={{ event, setEvent, eventArray, setEventArray }}
    >
      <EventForm />
    </CreateEventContext.Provider>
  )
}
