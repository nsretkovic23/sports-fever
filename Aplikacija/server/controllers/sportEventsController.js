import mongoose from 'mongoose'
import express from 'express'

import SportEvent from '../models/sportEvent.model.js'
import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'
import {
  getConversation,
  joinConversation,
  makeNewConversation,
} from './conversationsController.js'
import { getMessages, deleteMessage } from './messagesController.js'
import { rateUser } from './usersController.js'

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
    time,
    free_spots,
    sport,
    lat,
    lng,
    price,
    creator,
  } = req.body

  try {
    const creatorUser = await User.findById(creator)

    let participants = [
      { id: creator, name: creatorUser.name, avgrate: 0, count: 0 },
    ]

    const newSportEvent = new SportEvent({
      title,
      description,
      date,
      time,
      free_spots,
      sport,
      lat,
      lng,
      price,
      creator,
      participants,
    })

    await newSportEvent.save() //mongoose funkcija za cuvanje, u ovom pozivu se cuva novi ev u bazu
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
  const { title, description, date, time, free_spots, sport, lat, lng, price } =
    req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const updatedSEvent = {
    title,
    description,
    date,
    time,
    free_spots,
    sport,
    lat,
    lng,
    price,
    _id: id,
  }

  await SportEvent.findByIdAndUpdate(id, updatedSEvent, { new: true })
  const eventConversation = await getConversation(id)
  res.status(200).json({ SportEv: updatedSEvent, eventConversation })
}

export const deleteSportEvent = async (req, res) => {
  const { id, userid } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  //ako je date.now manji od date eventa, znaci da ev jos nije odrzan, vratiti kredite
  //preko participants fetchuj usera preko id i izbaci mu event iz kreator/joined liste
  try {
    const sportEv = await SportEvent.findById(id)
    const evDate = new Date(sportEv.date)
    const isUserAdmin = await User.findById(userid)

    if (Date.now() < evDate || isUserAdmin.isAdmin === true) {
      const conversationForDeletion = await getConversation(sportEv.id)

      for (let i = 0; i < conversationForDeletion.allMessages.length; ++i) {
        await Message.findByIdAndDelete(
          conversationForDeletion.allMessages[i].id
        )
      }

      await Conversation.findByIdAndDelete(
        conversationForDeletion.specificConversation.id
      )

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
    //console.log(eventConversation)
    res.status(200).json({ SportEv, eventConversation })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const joinEvent = async (req, res) => {
  const { userId, eventId } = req.body

  try {
    const SportEv = await SportEvent.findById(eventId)
    const userParticipant = await User.findById(userId)
    const eventConversation = await getConversation(eventId)

    if (SportEv.participants.some((item) => item.id === userId)) {
      res.status(404).json({ message: 'user already joined this event' })
    } else if (SportEv.price > userParticipant.credits) {
      res.status(404).json({ message: 'not enough credits' })
    } else if (SportEv.free_spots > 0) {
      userParticipant.credits -= SportEv.price
      console.log(userParticipant.profileImage)
      SportEv?.participants.push({
        id: userId,
        name: userParticipant.name,
        profileImage: userParticipant.profileImage,
        avgrate: 0,
        count: 0,
      })
      SportEv.free_spots -= 1
      userParticipant?.joinedEvents.push({
        eventId: SportEv.id,
        eventTitle: SportEv.title,
      })

      await User.findByIdAndUpdate(userId, userParticipant, { new: true })
      await SportEvent.findByIdAndUpdate(eventId, SportEv, { new: true })
      await joinConversation(userId, SportEv.id)
      res.status(200).json({ SportEv, eventConversation })
    } else res.status(404).json({ message: 'no more free spots' })
  } catch (error) {
    res.status(404).json({ message: 'join event error' })
  }
}

export const rateParticipants = async (req, res) => {
  const { eventId, graderId, gradedId, rate } = req.body

  try {
    const SportEv = await SportEvent.findById(eventId)
    const eventConversation = await getConversation(eventId)
    SportEv.ratings.push({ graderid: graderId, gradedid: gradedId })
    //this is a participant in sport event, it's not user model it's actually sport event
    const gradedParticipant = SportEv.participants.find(
      (el) => el.id === gradedId
    )
    gradedParticipant.count++
    gradedParticipant.ratings.push(parseInt(rate))
    let newrating = 0
    for (let i = 0; i < gradedParticipant.ratings.length; ++i) {
      newrating += gradedParticipant.ratings[i]
    }
    gradedParticipant.avgrate = newrating / gradedParticipant.count
    console.log(gradedParticipant + ' ' + newrating)

    for (let i = 0; i < SportEv.participants.length; ++i) {
      if (SportEv.participants[i].id === gradedParticipant.id) {
        SportEv.participants[i] = gradedParticipant
      }
    } //fali da se User modelu pusha ocena i da mu se tamo racuna celokupna ocena

    //updating user here:
    await rateUser(gradedId, rate)

    await SportEvent.findByIdAndUpdate(eventId, SportEv, { new: true })
    res.status(200).json({ SportEv, eventConversation })
    //SportEv.participants.map(ev=> ev.id!=gradedParticipant ? el : gradedParticipant)
  } catch (error) {
    res.status(400).json({ message: 'greska rating' })
  }
}
export default router
