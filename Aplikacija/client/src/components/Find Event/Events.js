import React from 'react'
import { Search } from '../Maps/MapFunctions'
import '../../styles.css'

export const Events = ({ eventArray, find, radius, setRadius }) => {
  return (
    <>
      <Search panTo={setRadius} />
      {find.findEvent
        ? eventArray
            .filter((ev) => ev.sport === find.sport)
            .filter(
              (m) =>
                parseFloat(m.lat) <= parseFloat(radius.lat) + 0.21 &&
                parseFloat(m.lat) >= parseFloat(radius.lat) - 0.21 &&
                parseFloat(m.lng) <= parseFloat(radius.lng) + 0.21 &&
                parseFloat(m.lng) >= parseFloat(radius.lng) - 0.21
            )
            .map((event) => {
              return drawEvent(event)
            })
        : eventArray
            .filter(
              (m) =>
                parseFloat(m.lat) <= parseFloat(radius.lat) + 0.21 &&
                parseFloat(m.lat) >= parseFloat(radius.lat) - 0.21 &&
                parseFloat(m.lng) <= parseFloat(radius.lng) + 0.21 &&
                parseFloat(m.lng) >= parseFloat(radius.lng) - 0.21
            )
            .map((event) => {
              return drawEvent(event)
            })}
    </>
  )
}

function drawEvent(event) {
  return (
    <div key={event._id} className='editDiv'>
      <h3>{event.title}</h3>
      <h6>{event.sport}</h6>
      <p>{event.description}</p>
      <p>Available spots: {event.free_spots}</p>
    </div>
  )
}
