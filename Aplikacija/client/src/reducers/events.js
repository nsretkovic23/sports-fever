import {
  FETCH_ALL,
  FETCH_SINGLE,
  CREATE,
  FETCH_NEARBY,
} from '../constants/actionTypes'

export default (events = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case FETCH_SINGLE:
      return action.payload
    case FETCH_NEARBY:
      return action.payload
    case CREATE:
      return [...events, action.payload]

    default:
      return events
  }
}
