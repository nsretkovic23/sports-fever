import * as action from '../constants/actionTypes'
import * as api from '../api/index'

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    dispatch({ type: action.AUTH, data })
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)
    dispatch({ type: action.AUTH, data })
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserById(id)
    dispatch({ type: action.USER, data })
  } catch (error) {
    console.log(error)
  }
}

export const askForCredit = (credit) => async (dispatch) => {
  try {
    const { data } = await api.creditRequest(credit)
    dispatch({ type: action.CREDIT, payload: data })
  } catch (error) {
    console.log(error)
  }
}
