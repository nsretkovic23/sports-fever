import React, { useState } from 'react'
import { EventForm } from './EventForm'
//import { Map } from './GoogleMap'

export const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    availableSpots: '',
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
      <article>
        {eventArray.map((event) => {
          return <h1>{event.title}</h1>
        })}
      </article>
    </>
  )
}
/*
  <div>
        <Map eventArray={eventArray} />
      </div>
 */
