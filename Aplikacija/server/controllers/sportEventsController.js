import mongoose from 'mongoose'
import express from 'express'

import SportEvent from '../models/sportEvent.model.js'
import User from '../models/user.model.js'
import {
  getConversation,
  joinConversation,
  makeNewConversation,
} from './conversationsController.js'

const router = express.Router()

export const filterEvents = async (req, res) => {
  let { long, lat, sport, date, spots, price } = req.params
  const dateStr = new Date(date).toDateString()
  let priceInt
  try {
    let allEvents = await SportEvent.find()
    let filteredEvents

    const radiusConst = 0.5 //+- radius long i lat za iscrtavanje dogadjaja samo iz okoline
    let poslong = parseFloat(long) + radiusConst
    let neglong = parseFloat(long) - radiusConst
    let poslat = parseFloat(lat) + radiusConst
    let neglat = parseFloat(lat) - radiusConst

    filteredEvents = allEvents.filter(
      (el) =>
        parseFloat(el.lng) <= poslong &&
        parseFloat(el.lng) >= neglong &&
        parseFloat(el.lat) <= poslat &&
        parseFloat(el.lat) >= neglat &&
        el.date.toDateString() === dateStr
    ) //prvi, default filter
    //datum se uvek salje - default je: danasnji dan
    //ako nije izabran sport - trazi sve, default "all"
    //spots trazi od spots broj i vise (ako treba 1 free spot, nalazi one sa  1+) - default 0
    //cena prijave od prosledjene cene <= dogadjaji, default - 0, trazi samo besplatne

    //pomoc za testiranje fetch linka:
    console.log(
      `long: ${long}, lat: ${lat}, sport: ${sport}, datum ${date}, mesta ${spots}, cena: ${price}`
    )
    //primer test linka: http://localhost:5000/event/filter/22(lng)-43.1(lat)-fudbal(sport).2021-05-21(date).0(free spots).all(price)
    if (sport !== 'all')
      filteredEvents = filteredEvents.filter((el) => el.sport === sport)

    if (parseInt(spots) > 0)
      filteredEvents = filteredEvents.filter(
        (el) => parseInt(el.free_spots) >= parseInt(spots)
      )

    if (price !== 'all') {
      if (price === 'free')
        filteredEvents = filteredEvents.filter((el) => parseInt(el.price) === 0)
      else priceInt = parseInt(price)
      if (priceInt <= 200)
        filteredEvents = filteredEvents.filter(
          (el) => parseInt(el.price) > 0 && parseInt(el.price) <= 200
        )
      if (priceInt > 200 && priceInt <= 500)
        filteredEvents = filteredEvents.filter(
          (el) => parseInt(el.price) > 200 && parseInt(el.price) <= 500
        )
      if (priceInt > 500)
        filteredEvents = filteredEvents.filter((el) => parseInt(el.price) > 500)
    }

    //console.log(filteredEvents)
    res.status(200).json(filteredEvents)
  } catch (error) {
    res.status(404).json({ msg: error.message })
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
  const {
    title,
    description,
    date,
    free_spots,
    sport,
    lat,
    lng,
    price,
    creator,
  } = req.body
  let participants = [{ id: creator }]

  const newSportEvent = new SportEvent({
    title,
    description,
    date,
    free_spots,
    sport,
    lat,
    lng,
    price,
    creator,
    participants,
  })

  try {
    await newSportEvent.save() //mongoose funkcija za cuvanje, u ovom pozivu se cuva novi ev u bazu
    const creatorUser = await User.findById(creator)

    await makeNewConversation(creator, newSportEvent.id)
    creatorUser.createdEvents.push({
      eventId: newSportEvent.id,
      eventTitle: newSportEvent.title,
    })

    await User.findByIdAndUpdate(creator, creatorUser, { new: true })
    console.log(` SERVER : ${newSportEvent}`)
    res.status(201).json(newSportEvent) //201 uspesno kreiranje
  } catch (err) {
    res.status(409).json({ message: err.message }) //conflict
  }
}

export const updateSportEvent = async (req, res) => {
  const { id } = req.params
  const { title, description, date, free_spots, sport, lat, lng, price } =
    req.body

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
    price,
    _id: id,
  }

  await SportEvent.findByIdAndUpdate(id, updatedSEvent, { new: true })

  res.json(updatedSEvent)
}

export const deleteSportEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  //ako je date.now manji od date eventa, znaci da ev jos nije odrzan, vratiti kredite
  //preko participants fetchuj usera preko id i izbaci mu event iz kreator/joined liste
  try {
    const sportEv = await SportEvent.findById(id)
    const evDate = new Date(sportEv.date)

    if (Date.now() < evDate) {
      let creator = await User.findById(sportEv.creator) //kreator je nulti tj prvi participant u eventu
      const newCreatedEvents = creator?.createdEvents.filter(
        (ev) => ev['eventId'] !== id
      ) //uklanjamo kreatoru event iz createdEvents
      creator.createdEvents = newCreatedEvents

      await User.findByIdAndUpdate(sportEv.creator, creator, { new: true })

      for (let i = 1; i < sportEv.participants?.length; ++i) {
        let participant = await User.findById(sportEv.participants[i]['id'])
        let newJoinedEvs = participant.joinedEvents.filter(
          (ev) => ev['eventId'] !== id
        )

        participant.credits += sportEv.price
        participant.joinedEvents = newJoinedEvs
        participant.notifications.push({
          description: `Event "${sportEv.title}" you joined has been canceled or deleted, you got your ${sportEv.price} credits back!`,
          isSeen: 0,
        })

        await User.findByIdAndUpdate(
          sportEv.participants[i]['id'],
          participant,
          { new: true }
        )
      }

      await SportEvent.findByIdAndDelete(id)
      return res.status(200).json({ message: 'deleted succesfully' })
    } else {
      return res.status(200).json({
        message: 'the event has already taken place and can not be deleted',
      })
    }
  } catch (error) {
    res.status(404).json({ message: 'error while deleting event' })
  }
}

export const getSportEventById = async (req, res) => {
  const { id } = req.params

  try {
    const SportEv = await SportEvent.findById(id)
    const eventConversation = await getConversation(id)
    console.log(eventConversation)
    res.status(200).json({ SportEv, eventConversation })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const joinEvent = async (req, res) => {
  const { userId, eventId } = req.body

  try {
    const sportEv = await SportEvent.findById(eventId)
    const userParticipant = await User.findById(userId)

    if (sportEv.participants.some((item) => item.id === userId)) {
      res.status(404).json({ message: 'user already joined this event' })
    } else if (sportEv.price > userParticipant.credits) {
      res.status(404).json({ message: 'not enough credits' })
    } else if (sportEv.free_spots > 0) {
      userParticipant.credits -= sportEv.price
      sportEv?.participants.push({ id: userId })
      sportEv.free_spots -= 1
      userParticipant?.joinedEvents.push({
        eventId: sportEv.id,
        eventTitle: sportEv.title,
      })

      await User.findByIdAndUpdate(userId, userParticipant, { new: true })
      await SportEvent.findByIdAndUpdate(eventId, sportEv, { new: true })
      await joinConversation(userId, sportEv.id)
      res.status(200).json(sportEv)
    } else res.status(404).json({ message: 'no more free spots' })
  } catch (error) {
    res.status(404).json({ message: 'join event error' })
  }
}
export default router
