import React, { useState } from 'react'
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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

export const options = [
  { value: 'all', label: 'All' },
  { value: 'fudbal', label: 'Fudbal' },
  { value: 'kosarka', label: 'Kosarka' },
  { value: 'odbojka', label: 'Odbojka' },
  { value: 'hokej', label: 'Hokej' },
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paperForCreate: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#04D4F0',
  },
  paperForUpdate: {
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
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  tField: {
    alignSelf: 'center',
    backgroundColor: '#04ECF0',
    color: 'black',
  },
  buttonCreate: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
    marginTop: '10px',
    width: '20%',
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
}))

export const Form = ({
  event,
  handleChange,
  handleSubmit,
  longitude,
  latitude,
  buttonTitle,
  selectedDate,
  handleDateChange,
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const chooseStyle = buttonTitle === 'Create' ? true : false

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <>
      <Paper
        className={
          chooseStyle == true ? classes.paperForCreate : classes.paperForUpdate
        }
        elevation={10}
      >
        <form className={classNames(classes.root, classes.form)}>
          {chooseStyle ? (
            <Typography variant='h5' className={classes.title}>
              Create your own event
            </Typography>
          ) : null}
          <TextField
            name='title'
            id='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={event.title}
            onChange={handleChange}
            className={classes.tField}
          />
          <TextField
            id='description'
            label='Description:'
            name='description'
            variant='outlined'
            multiline
            rowsMax={5}
            fullWidth
            value={event.description}
            onChange={handleChange}
            className={classes.tField}
          />
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
          <Typography variant='h6' className={classes.typography}>
            Latitude: {latitude}
          </Typography>
          <Typography variant='h6' className={classes.typography}>
            Longitude: {longitude}
          </Typography>
          <Button
            varient='contained'
            type='submit'
            onClick={handleSubmit}
            className={classes.buttonCreate}
          >
            {buttonTitle}
          </Button>
        </form>
      </Paper>
    </>
  )
}
