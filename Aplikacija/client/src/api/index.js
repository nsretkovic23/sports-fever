import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5001' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const fetchEvents = (long, lat, sport, date, spots, price) =>
  API.get(`/event/filter/${long}-${lat}-${sport}.${date}.${spots}.${price}`)

export const createEvent = (newEvent) => API.post(`/event/add`, newEvent)

export const deleteEvent = (id, userID) => API.delete(`/event/${id}-${userID}`)

export const joinEvent = (data) => API.post(`/event/join/`, data)

export const fetchEvent = (id) => API.get(`/event/${id}`)

export const updateEvent = (id, updatedEvent) =>
  API.patch(`/event/${id}`, updatedEvent)

export const sendMessage = (message) => API.post(`/message/newmsg`, message)

export const rateUser = (data) => API.post(`/event/rate/`, data)

export const report = (data) => API.post(`/report/newreport/`, data)

export const creditRequest = (data) =>
  API.post(`/creditrequest/newrequest`, data)

export const getReports = () => API.get(`/report/`)
export const getCredits = () => API.get(`/creditrequest/`)

export const deleteReport = (id) => API.delete(`/report/delete/${id}`)
export const deleteCredit = (id) => API.delete(`/creditrequest/delete/${id}`)

//---------------------------------------------------------------------------

export const signIn = (data) => API.post('/user/signin', data)

export const signUp = (data) => API.post('/user/signup', data)

export const fetchUserById = (id) => API.get(`/user/${id}`)

export const banUser = (id) => API.patch(`/user/ban/${id}`)

export const addCredit = (data) => API.patch(`/user/addcredits`, data)
