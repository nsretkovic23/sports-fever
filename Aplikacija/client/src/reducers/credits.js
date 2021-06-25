import * as actionType from '../constants/actionTypes'

const creditsReducer = (credits = [], action) => {
  switch (action.type) {
    case actionType.ALL_CREDITS:
      return action.payload
    case actionType.DELETE_CREDITS:
      return credits.filter((req) => req._id !== action.payload)
    case actionType.ADD_CREDIT:
      return credits
    default:
      return credits
  }
}

export default creditsReducer
