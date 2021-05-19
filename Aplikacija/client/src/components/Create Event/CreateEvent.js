import React, { useState } from 'react'
import { EventForm } from './EventForm'

export const CreateEventContext = React.createContext()

export const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    free_spots: '',
    sport: '',
    price: '',
  })

  return (
    <CreateEventContext.Provider
      value={{
        event,
        setEvent,
      }}
    >
      <EventForm />
    </CreateEventContext.Provider>
  )
}
