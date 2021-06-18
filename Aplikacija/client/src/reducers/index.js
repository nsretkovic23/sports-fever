import { combineReducers } from 'redux'
import auth from './authentification'
import events from './events'
import admin from './admin'

export const reducers = combineReducers({ events, auth, admin })
