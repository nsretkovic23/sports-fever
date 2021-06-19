import * as action from '../constants/actionTypes'
import * as api from '../api/index.js'

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(event)
    dispatch({ type: action.CREATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const joinEvent = (dataa) => async (dispatch) => {
  try {
    const { data } = await api.joinEvent(dataa)
    dispatch({ type: action.JOIN, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

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
      dispatch({ type: action.FETCH_NEARBY, payload: data })
    } catch (error) {
      console.log(error.message)
    }
  }

export const getEvent = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchEvent(id)
    dispatch({ type: action.FETCH_SINGLE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEvent = (id, event) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, event)
    dispatch({ type: action.UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id)
    dispatch({ type: action.DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const sendMessage = (message) => async (dispatch) => {
  try {
    const { data } = await api.sendMessage(message)
    dispatch({ type: action.MESSAGE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const rateUser = (rate) => async (dispatch) => {
  try {
    const { data } = await api.rateUser(rate)
    dispatch({ type: action.RATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const sendReport = (reportData) => async (dispatch) => {
  try {
    const { data } = await api.report(reportData)
    dispatch({ type: action.REPORT, payload: data })
  } catch (error) {
    console.log(error)
  }
}
