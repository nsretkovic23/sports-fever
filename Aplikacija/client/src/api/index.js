import axios from 'axios'

const addURL = 'http://localhost:5000/event/add'

export const createEvent = (newEvent) => axios.post(addURL, newEvent)
