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
import useStyles from './style'

export const FindFormWithMap = () => {
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
    <Grid container direction='row' className={classes.container} wrap='nowrap'>
      <Grid item xs={3} className={classes.formElement} wrap='nowrap'>
        <Paper className={classes.paperForm} elevation={10}>
          <form className={classNames(classes.root, classes.findFrom)}>
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
            <ButtonGroup
              variant='contained'
              className={classes.buttonGroupForm}
            >
              <Button
                varient='contained'
                type='submit'
                onClick={handleSubmit}
                className={classes.buttonsForm}
                fullWidth
              >
                Find
              </Button>
              <Button
                varient='contained'
                type='submit'
                onClick={resetEvent}
                fullWidth
                className={classes.buttonsForm}
              >
                Show all
              </Button>
            </ButtonGroup>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={9} wrap='nowrap' className={classes.mapElement}>
        <MapWithEvents find={find} radius={radius} setRadius={setRadius} />
      </Grid>
    </Grid>
  )
}
