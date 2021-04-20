import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchEvents = () => API.get('/event')
export const createEvent = (newEvent) => API.post(`/add`, newEvent)
export const signIn = (data) => API.get('/user/signin', data)
export const signUp = (data) => API.get('/user/signup', data)
