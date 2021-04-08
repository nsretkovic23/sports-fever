import axios from 'axios'

const url = 'http://localhost:5000/event'

export const fetchEvents = () => axios.get(url)
export const createEvent = (newEvent) => axios.post(`${url}/add`, newEvent)
