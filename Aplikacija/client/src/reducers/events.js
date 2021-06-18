import * as actionType from '../constants/actionTypes'

export default (events = [], action) => {
  switch (action.type) {
    case actionType.FETCH_ALL:
      return action.payload
    case actionType.FETCH_SINGLE:
      return action.payload
    case actionType.FETCH_NEARBY:
      return action.payload
    case actionType.JOIN:
      return action.payload
    case actionType.CREATE:
      return [...events, action.payload]
    case actionType.UPDATE:
      return action.payload
    case actionType.DELETE:
      return events.filter((event) => event._id !== action.payload)
    case actionType.MESSAGE:
      return events
    case actionType.RATE:
      return action.payload
    case actionType.REPORT:
      return events
    case actionType.CREDIT:
      return events
    default:
      return events
  }
}
