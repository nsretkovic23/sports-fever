import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import { Paper, ButtonGroup, Grid } from '@material-ui/core'
import {
  getEvent,
  deleteEvent,
  updateEvent,
  joinEvent,
  sendMessage,
} from '../../../actions/event'
import { Form } from '../../Create Event/Form'
import useStyles from '../style'
import { DialogContent, DialogTitle } from '../style'
import { Conversation } from './Conversation'
import { io } from 'socket.io-client'

const ENDPOINT = 'localhost:5000'
let socket
var connectionOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
}
export const Event = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const location = useLocation()
  const event = useSelector((state) => state.events.SportEv)
  const [newMessage, setNewMessage] = useState('')
  const conversation = useSelector(
    (state) => state.events.eventConversation?.specificConversation
  )
  const messages = useSelector(
    (state) => state.events.eventConversation?.allMessages
  )
  const [socketMessages, setSocketMessages] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const _id = location.pathname.split('singleEvent/')
  const classes = useStyles()
  const [selectedDate, handleDateChange] = useState('')
  const [joined, setJoined] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    free_spots: '',
    sport: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getEvent(_id[1]))
  }, [_id[1], dispatch])

  useEffect(() => {
    if (event) {
      setNewEvent(event)
      handleDateChange(event.date)
      if (
        event?.participants?.some(
          (item) =>
            item.id === user?.result?.googleId || item.id === user?.result?._id
        )
      )
        setJoined(true)
    }
  }, [event, refresh])

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setNewEvent({ ...newEvent, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.description && newEvent.free_spots > 0) {
      const newDate = new Date(selectedDate).toISOString()
      const newInfo = { ...newEvent, date: newDate }
      dispatch(updateEvent(event._id, newInfo))
      handleClose()
      setRefresh((prev) => !prev)
    } else {
      alert('Wrong inputs')
    }
  }

  const joinThisEvent = (e) => {
    e.preventDefault()
    let uID = ''
    if (user?.result?._id) uID = user?.result?._id
    else uID = user?.result?.googleId
    const data = {
      userId: uID,
      eventId: event._id,
    }
    dispatch(joinEvent(data))
    setRefresh((prev) => !prev)
  }

  const sendNewMessage = (ev) => {
    ev.preventDefault()
    if (newMessage) {
      socket.emit('sendMessage', {
        conversationId: conversation?._id,
        senderId: user?.result?._id,
        senderName: user?.result?.name,
        text: newMessage,
      },()=>setNewMessage(''))
      dispatch(
        sendMessage({
          conversationId: conversation._id,
          senderId: user?.result?._id,
          senderName: user?.result?.name,
          text: newMessage,
        })
      )
      
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    if (conversation?._id) {
      socket.emit(
        'join',
        {
          name: user?.result?.name,
          room: conversation._id,
        },
        (error) => {
          if (error) {
            console.log(error)
          }
        }
      )
    }
    if (messages) {
      setSocketMessages(messages)
      console.log("HEY")
    }
  }, [ENDPOINT, location.search, conversation?._id])

  useEffect(() => {
    socket.on('message', message => {
      setSocketMessages((socketMessages) => [...socketMessages, message])
    })

    // socket.on('roomData', ({ users }) => {
    //   setUsers(users)
    // })
  }, [socketMessages])


  console.log(socketMessages)

  return (
    <Grid container direction='row'>
      <Grid item xs={6}>
        <Paper className={classes.paper} elevation={10}>
          {user?.result?.googleId === event?.creator ||
          user?.result?._id === event?.creator ? (
            <ButtonGroup variant='contained' className={classes.buttonGroup}>
              <Button
                className={classes.buttons}
                variant='contained'
                onClick={handleClickOpen}
              >
                Update
              </Button>
              <Button
                className={classes.buttons}
                variant='contained'
                onClick={(ev) => {
                  ev.preventDefault()
                  dispatch(deleteEvent(_id[1]))
                  history.push('/')
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          ) : null}

          <Typography align='center' variant='h3'>
            {event?.title}
          </Typography>

          <Typography align='center' variant='subtitle1'>
            {event?.description}
          </Typography>

          <Typography align='center' variant='subtitle2'>
            Date: {event?.date?.split('T')[0]}
          </Typography>

          <Typography align='center' variant='subtitle2'>
            Sport: {event?.sport}
          </Typography>
          <Typography align='center' variant='subtitle2'>
            Available spots: {event?.free_spots}
          </Typography>
          <Typography align='center' variant='subtitle2'>
            Price: {event?.price}
          </Typography>

          {!joined ? (
            <Button
              className={classes.buttons}
              variant='contained'
              onClick={(ev) => {
                joinThisEvent(ev)
              }}
            >
              +Join
            </Button>
          ) : null}
        </Paper>
        <Dialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Update your event
          </DialogTitle>
          <DialogContent dividers>
            <Form
              event={newEvent}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              longitude={newEvent.lng}
              latitude={newEvent.lat}
              buttonTitle={'Update'}
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={4}>
        {joined ? (
          <Conversation
            messages={socketMessages}
            setNewMessage={setNewMessage}
            sendNewMessage={sendNewMessage}
            newMessage={newMessage}
            user={user}
          />
        ) : null}
      </Grid>
    </Grid>
  )
}
