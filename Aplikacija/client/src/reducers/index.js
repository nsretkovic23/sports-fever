import { combineReducers } from 'redux'
import auth from './authentification'
import events from './events'

export const reducers = combineReducers({ events, auth })
