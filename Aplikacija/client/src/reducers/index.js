import { combineReducers } from 'redux'
import auth from './authentification'
import events from './events'
import reports from './reports'
import credits from './credits'

export const reducers = combineReducers({ events, auth, reports, credits })
