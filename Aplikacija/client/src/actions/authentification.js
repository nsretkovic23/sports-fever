import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index'

export const signin = (data, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(data)
    dispatch({ type: AUTH, data })
    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const signup = (data, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(data)
    dispatch({ type: AUTH, data })
    history.push('/')
  } catch (error) {
    console.log(error)
  }
}
