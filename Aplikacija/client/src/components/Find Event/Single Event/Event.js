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
} from '../../../actions/event'
import { Form } from '../../Create Event/Form'
import useStyles from '../style'
import { DialogContent, DialogTitle } from '../style'
import { Conversation } from './ComponentForEvent/Conversation'
import { RatingList } from './ComponentForEvent/RatingList'
import { ListOfRatedParticipants } from './ComponentForEvent/ListOfRatedParticipants'
import { ReportForm } from './ComponentForEvent/ReportForm'

export const Event = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const location = useLocation()
  const event = useSelector((state) => state.events.SportEv)
  const conversation = useSelector(
    (state) => state.events.eventConversation?.specificConversation
  )
  const messages = useSelector(
    (state) => state.events.eventConversation?.allMessages
  )
  const _id = location.pathname.split('singleEvent/')
  const classes = useStyles()
  const [selectedDate, handleDateChange] = useState('')
  const [joined, setJoined] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    free_spots: '',
    sport: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = React.useState({
    state: false,
    title: '',
    isUpdate: null,
  })
  const todaysDate = new Date().toISOString().split('T')[0]
  let tomorrow = new Date(event?.date)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // const handleClickOpen = () => {
  //   setOpen({
  //     ...open,
  //     state: true,
  //   })
  // }

  const handleClose = () => {
    setOpen({ ...open, state: false })
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
  }, [event])

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
  }

  const state = useSelector((state) => state.events)
  if (!user?.result?.name) {
    return (
      <Typography variant='h5' align='center'>
        Sign in if you want to view event
      </Typography>
    )
  }

  if (!event) {
    return (
      <Typography variant='h5' align='center'>
        There is no event with this id
      </Typography>
    )
  }
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
                onClick={(ev) => {
                  ev.preventDefault()
                  setOpen({
                    state: true,
                    title: 'Update your event',
                    isUpdate: true,
                  })
                }}
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
          ) : (
            <ButtonGroup variant='contained' className={classes.buttonGroup}>
              <Button
                className={classes.buttons}
                variant='contained'
                onClick={(ev) => {
                  ev.preventDefault()
                  setOpen({
                    state: true,
                    title: 'Report this event',
                    isUpdate: false,
                  })
                }}
              >
                Report
              </Button>
            </ButtonGroup>
          )}

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
            Time: {event?.time}
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
          open={open?.state}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            {open.title}
          </DialogTitle>
          <DialogContent dividers>
            {open.isUpdate ? (
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
            ) : (
              <ReportForm
                idForReport={event?._id}
                handleClose={handleClose}
                type={'Event'}
                userID={user?.result?._id}
              ></ReportForm>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={4}>
        {joined && todaysDate.localeCompare(event?.date.split('T')[0]) !== 1 ? (
          <Conversation
            messages={messages}
            user={user}
            conversationID={conversation?._id}
          />
        ) : (
          [
            joined &&
            tomorrow.toISOString().split('T')[0].localeCompare(todaysDate) ===
              0 ? (
              <RatingList event={event} user={user}></RatingList>
            ) : (
              [
                todaysDate.localeCompare(event?.date.split('T')[0]) !== -1 ? (
                  <ListOfRatedParticipants
                    event={event}
                    user={user}
                  ></ListOfRatedParticipants>
                ) : null,
              ]
            ),
          ]
        )}
      </Grid>
    </Grid>
  )
}
