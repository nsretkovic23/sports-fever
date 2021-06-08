import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import {
  Paper,
  ButtonGroup,
  Grid,
  Container,
  TextField,
} from '@material-ui/core'
import {
  getEvent,
  deleteEvent,
  updateEvent,
  joinEvent,
  sendMessage,
} from '../../../actions/event'
import { makeStyles } from '@material-ui/core/styles'
import { Form } from '../../Create Event/Form'
import { Message } from './Message'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    padding: '20px 20px',
    margin: '20px 20px',
  },
  paperMessage: {
    height: '100%',
    width: '100%',
  },
  buttons: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
    alignSelf: 'flex-end',
  },
  buttonGroup: {
    alignSelf: 'flex-end',
    marginBottom: '30px',
  },
  chatBoxWeapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  chatBoxTop: {
    height: '100%',
    overflowY: 'scroll',
    paddingRight: '10px',
  },
  chatBoxBottom: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatMessageInput: {
    width: '80%',
    height: '90px',
    padding: '10px',
  },
  chatSubmitButton: {
    width: '70px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#04ECF0',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
}))

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

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
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getEvent(_id[1]))
  }, [_id[1], refresh, dispatch])

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
    dispatch(
      sendMessage({
        sender: user?.result?._id,
        text: newMessage,
        conversationId: conversation._id,
      })
    )
  }

  console.log(messages)
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
          <Paper
            className={classNames(classes.paper, classes.paperMessage)}
            elevation={10}
          >
            <Container className={classes.chatBox}>
              <Container className={classes.chatBoxWeapper}>
                <Container className={classes.chatBoxTop}>
                  {messages?.map((m) => (
                    <Container ref={scrollRef} key={m.createdAt}>
                      <Message
                        message={m}
                        own={m?.senderId === user?.result?._id}
                      ></Message>
                    </Container>
                  ))}
                </Container>
                <Container className={classes.chatBoxBottom}>
                  <TextField
                    id='filled-multiline-static'
                    label='Send message'
                    multiline
                    rows={4}
                    variant='outlined'
                    value={newMessage}
                    onChange={(e) => {
                      e.preventDefault()
                      setNewMessage(e.target.value)
                    }}
                    className={classes.chatMessageInput}
                  />
                  <Button
                    className={classes.chatSubmitButton}
                    variant='contained'
                    onClick={(ev) => {
                      sendNewMessage(ev)
                    }}
                  >
                    Send
                  </Button>
                </Container>
              </Container>
            </Container>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  )
}
