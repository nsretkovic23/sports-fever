import {
  FETCH_ALL,
  FETCH_SINGLE,
  CREATE,
  FETCH_NEARBY,
  UPDATE,
  DELETE,
  JOIN,
} from '../constants/actionTypes'

export default (events = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case FETCH_SINGLE:
      return action.payload
    case FETCH_NEARBY:
      return action.payload
    case JOIN:
      return action.payload
    case CREATE:
      return [...events, action.payload]
    case UPDATE:
      return events.map((ev) =>
        ev._id === action.payload._id ? action.payload : ev
      )
    case DELETE:
      return events.filter((event) => event._id !== action.payload)

    default:
      return events
  }
}
