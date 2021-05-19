import {
  FETCH_SINGLE,
  FETCH_NEARBY,
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
} from '../constants/actionTypes'
import * as api from '../api/index.js'

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(event)

    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

/*export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEvents()

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}
*/

export const getEvents =
  (long, lat, sport, date, spots, price) => async (dispatch) => {
    try {
      const { data } = await api.fetchEvents(
        long,
        lat,
        sport,
        date,
        spots,
        price
      )
      console.log(`ACTION ${data}`)
      dispatch({ type: FETCH_NEARBY, payload: data })
    } catch (error) {
      console.log(error.message)
    }
  }

export const getEvent = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchEvent(id)

    dispatch({ type: FETCH_SINGLE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEvent = (id, event) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, event)
    console.log('ACTION')
    console.log(data)
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await await api.deleteEvent(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}
