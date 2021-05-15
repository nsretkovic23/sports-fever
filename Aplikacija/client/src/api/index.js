import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})
export const fetchEvents = () => API.get('/event')
export const fetchNearByEvents = (long, lat) => API.get(`/event/${long}-${lat}`)
export const createEvent = (newEvent) => API.post(`/event/add`, newEvent)
export const signIn = (data) => API.post('/user/signin', data)
export const signUp = (data) => API.post('/user/signup', data)
export const fetchEvent = (id) => API.get(`/event/${id}`)
