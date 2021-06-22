import * as action from '../constants/actionTypes'
import * as api from '../api/index'

export const getAllReports = () => async (dispatch) => {
  try {
    const { data } = await api.getReports()
    dispatch({ type: action.ALL_REPORTS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getAllCredits = () => async (dispatch) => {
  try {
    const { data } = await api.getCredits()
    dispatch({ type: action.ALL_CREDITS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCredit = (id) => async (dispatch) => {
  try {
    await api.deleteCredit(id)
    dispatch({ type: action.DELETE_CREDITS, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const deleteReport = (id) => async (dispatch) => {
  try {
    await api.deleteReport(id)
    dispatch({ type: action.DELETE_REPORTS, payload: id })
  } catch (error) {
    console.log(error)
  }
}