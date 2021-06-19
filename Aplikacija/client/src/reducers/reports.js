import * as actionType from '../constants/actionTypes'

const reportsReducer = (reports = [], action) => {
  switch (action.type) {
    case actionType.ALL_REPORTS:
      return action.payload
    case actionType.DELETE_REPORTS:
      return reports.filter((rep) => rep._id !== action.payload)
    default:
      return reports
  }
}

export default reportsReducer
