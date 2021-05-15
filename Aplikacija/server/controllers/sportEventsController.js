import mongoose from 'mongoose'
import express from 'express'

import SportEvent from '../models/sportEvent.model.js'

const router = express.Router()

export const getNearbySportEvents = async (req, res) => {
  let { long, lat } = req.params
  const radiusConst = 0.5 //+- radius long i lat za iscrtavanje dogadjaja samo iz okoline
  let pozlong = parseFloat(long) + radiusConst
  let neglong = parseFloat(long) - radiusConst
  let pozlat = parseFloat(lat) + radiusConst
  let neglat = parseFloat(lat) - radiusConst

  try {
    let allEvents = await SportEvent.find() //nadji sve evente
    const filteredEvents = allEvents.filter(
      (el) =>
        parseFloat(el.lng) <= pozlong &&
        parseFloat(el.lng) >= neglong &&
        parseFloat(el.lat) <= pozlat &&
        parseFloat(el.lat) >= neglat
    )
    res.status(200).json(filteredEvents)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSportEvents = async (req, res) => {
  try {
    const allSportEvents = await SportEvent.find()

    res.status(200).json(allSportEvents)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const createSportEvent = async (req, res) => {
  const { title, description, date, free_spots, sport, lat, lng, creator } =
    req.body
  const newSportEvent = new SportEvent({
    title,
    description,
    date,
    free_spots,
    sport,
    lat,
    lng,
    creator,
  })

  try {
    await newSportEvent.save() //mongoose funkcija za cuvanje, u ovom pozivu se cuva novi ev u bazu

    res.status(201).json(newSportEvent) //201 uspesno kreiranje
  } catch (err) {
    res.status(409).json({ message: err.message }) //conflict
  }
}

export const updateSportEvent = async (req, res) => {
  const { id } = req.params
  const { title, description, date, free_spots, sport, lat, lng } = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const updatedSEvent = {
    title,
    description,
    date,
    free_spots,
    sport,
    lat,
    lng,
    _id: id,
  }

  await SportEvent.findByIdAndUpdate(id, updatedSEvent, { new: true })

  res.json(updatedSEvent)
}

export const getSportEventById = async (req, res) => {
  const { id } = req.params

  try {
    const SportEv = await SportEvent.findById(id)
    res.status(200).json(SportEv)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default router
