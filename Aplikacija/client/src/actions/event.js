import { FETCH_ALL, CREATE } from '../constants/actionTypes'
import * as api from '../api/index.js'
export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(event)

    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}
