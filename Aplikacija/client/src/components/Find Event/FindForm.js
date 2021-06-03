import React, { useState } from 'react'
import { MapWithEvents } from '../Maps/MapWithEvents'
import { options } from '../Create Event/Form'
import { center } from '../Maps/MapConst'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import {
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
} from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#04D4F0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    alignSelf: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  tField: {
    alignSelf: 'center',
    backgroundColor: '#04ECF0',
    color: 'black',
  },
  buttons: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
  typography: {
    marginTop: '10px',
  },
  title: {
    marginBottom: '20px',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonGroup: {
    marginTop: '20px',
    alignSelf: 'center',
  },
}))

export const FindForm = () => {
  const [selectedDate, handleDateChange] = useState(new Date())
  const [find, setFind] = useState({
    date: '',
    free_spots: '',
    sport: '',
    price: '',
    findEvent: false,
  })
  const [event, setEvent] = useState({
    date: '',
    free_spots: '',
    sport: '',
    price: '',
  })

  const [radius, setRadius] = useState({
    lat: center.lat,
    lng: center.lng,
  })

  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setEvent({ ...event, findEvent: '' })
    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDate = selectedDate.toISOString().split('T')
    setFind({ ...event, date: newDate[0], findEvent: 'true' })
  }

  const resetEvent = (ev) => {
    ev.preventDefault()
    setFind({
      date: '',
      free_spots: '',
      sport: '',
      price: '',
      findEvent: false,
    })
  }

  return (
    <Grid container direction='row'>
      <Grid item xs={3}>
        <Paper className={classes.paper} elevation={10}>
          <form className={classNames(classes.root, classes.form)}>
            <Typography variant='h5' className={classes.title}>
              Find any event
            </Typography>
            <TextField
              name='free_spots'
              id='free_spots'
              type='number'
              variant='outlined'
              label='Available spots'
              fullWidth
              value={event.free_spots}
              onChange={handleChange}
              className={classes.tField}
            />
            <TextField
              name='price'
              id='price'
              type='number'
              variant='outlined'
              label='Price'
              fullWidth
              value={event.price}
              onChange={handleChange}
              className={classes.tField}
            />
            <InputLabel id='sport'>Choose a sport</InputLabel>
            <Select
              labelId='sport'
              name='sport'
              id='sport'
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={event.sport}
              onChange={handleChange}
              className={classes.tField}
              fullWidth
            >
              {options.map((el) => {
                return (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                )
              })}
            </Select>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disablePast={true}
              />
            </MuiPickersUtilsProvider>
            <ButtonGroup variant='contained' className={classes.buttonGroup}>
              <Button
                varient='contained'
                type='submit'
                onClick={handleSubmit}
                className={classes.buttons}
                fullWidth
              >
                Find
              </Button>
              <Button
                varient='contained'
                type='submit'
                onClick={resetEvent}
                fullWidth
                className={classes.buttons}
              >
                Show all
              </Button>
            </ButtonGroup>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <MapWithEvents find={find} radius={radius} setRadius={setRadius} />
      </Grid>
    </Grid>
  )
}
