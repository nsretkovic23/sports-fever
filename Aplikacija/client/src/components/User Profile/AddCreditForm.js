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
import classNames from 'classnames'
import useStyles from '../Create Event/style'

export const AddCreditForm = ({ idForUser, handleClose }) => {
  const classes = useStyles()
  const [creditRequest, setCreditRequest] = useState({
    idOfUser: idForUser,
    credit: '',
  })

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setCreditRequest({ ...creditRequest, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (creditRequest.credit) {
      //dispatch(reportEvent(report))
      console.log(creditRequest)
      handleClose()
    }
  }

  return (
    <>
      <Paper className={classes.paperForUpdate} elevation={10}>
        <form className={classNames(classes.root, classes.form)}>
          <TextField
            name='credit'
            id='credit'
            variant='outlined'
            label='Credit'
            type='number'
            fullWidth
            value={creditRequest.credit}
            onChange={handleChange}
            className={classes.tField}
          />
          <Button
            varient='contained'
            type='submit'
            onClick={handleSubmit}
            className={classes.buttonReport}
          >
            Send Request
          </Button>
        </form>
      </Paper>
    </>
  )
}
