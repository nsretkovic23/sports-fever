import React, { useState } from 'react'
import { EventForm } from './EventForm'

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
    <>
      <div>
        <EventForm
          event={event}
          setEvent={setEvent.bind(this)}
          eventArray={eventArray}
          setEventArray={setEventArray.bind(this)}
        ></EventForm>
      </div>
    </>
  )
}
