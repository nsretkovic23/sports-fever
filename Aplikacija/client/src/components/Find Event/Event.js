import React, { useEffect, useState } from 'react'
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
import { Paper, ButtonGroup } from '@material-ui/core'
import {
  getEvent,
  deleteEvent,
  updateEvent,
  joinEvent,
} from '../../actions/event'
import { makeStyles } from '@material-ui/core/styles'
import { Form } from '../Create Event/Form'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '25%',
    textAlign: 'center',
    padding: '20px 20px',
    margin: '20px 20px',
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
  const conversation = useSelector((state) => state.events.eventConversation?.specificConversation)
  const message = useSelector((state) => state.events.eventConversation?.allMessages)
  const [refresh, setRefresh] = useState(null)
  const _id = location.pathname.split('singleEvent/')
  const classes = useStyles()
  const [selectedDate, handleDateChange] = useState('')
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
    //console.log('fetching')
    //console.log(event)
    //console.log(_id[1])
  }, [_id[1], refresh, dispatch])

  useEffect(() => {
    if (event) {
      //console.log('nov')
      //console.log(newEvent)
      setNewEvent(event)
      handleDateChange(event.date)
      //console.log(selectedDate)
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
  }

  console.log(conversation)
  console.log(message);
  return (
    <>
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

        {!event?.participants?.some(
          (item) =>
            item.id === user?.result?.googleId || item.id === user?.result?._id
        ) ? (
          <Button
            className={classes.buttons}
            variant='contained'
            onClick={(ev) => {
              joinThisEvent(ev)
            }}
          >
            +Join
          </Button>
        ) : (
          <Button className={classes.buttons} variant='contained'>
            Chat
          </Button>
        )}
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
    </>
  )
}
