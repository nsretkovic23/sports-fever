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
      return events.map((ev) =>
        ev._id === action.payload._id ? action.payload : ev
      )
    case actionType.DELETE:
      return events.filter((event) => event._id !== action.payload)
    case actionType.MESSAGE:
      return events
    default:
      return events
  }
}
