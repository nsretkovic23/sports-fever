import React, { useState } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from '../Create Event/style'

import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../actions/event'
import { banUser } from '../../actions/admin'

export const AdminForm = ({ buttonTitle, userId, handleClose }) => {
  const classes = useStyles()
  const [id, setId] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      if (buttonTitle === 'Delete') {
        dispatch(deleteEvent(id, userId))
        console.log('deleted')
      } else {
        dispatch(banUser(id))
        console.log('suspend')
      }
      handleClose()
    }
  }

  console.log(userId)
  return (
    <>
      <Paper className={classes.paperForUpdate} elevation={10}>
        <form className={classNames(classes.root, classes.form)}>
          <TextField
            name='id'
            id='amount'
            variant='outlined'
            label='ID'
            fullWidth
            value={id}
            onChange={(ev) => {
              setId(ev.target.value)
            }}
            className={classes.tField}
          />
          <Button
            varient='contained'
            type='submit'
            onClick={handleSubmit}
            className={classes.buttonReport}
          >
            {buttonTitle}
          </Button>
        </form>
      </Paper>
    </>
  )
}
