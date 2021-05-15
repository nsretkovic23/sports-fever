import {
  FETCH_SINGLE,
  FETCH_NEARBY,
  FETCH_ALL,
  CREATE,
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

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEvents()

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const getNearByEvents = (long, lat) => async (dispatch) => {
  try {
    const { data } = await api.fetchNearByEvents(long, lat)

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
