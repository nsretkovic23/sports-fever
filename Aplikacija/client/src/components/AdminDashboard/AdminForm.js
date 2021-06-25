import React, { useState } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from '../Create Event/style'

import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../actions/event'
import { banUser, addCredit } from '../../actions/admin'

export const AdminForm = ({ buttonTitle, userId, handleClose }) => {
  const classes = useStyles()
  const [id, setId] = useState('')
  const dispatch = useDispatch()
  const [credit, setCredit] = useState({
    id: '',
    amount: 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id || credit) {
      if (buttonTitle === 'Delete') {
        dispatch(deleteEvent(id, userId))
        console.log('deleted')
      } else if (buttonTitle === 'Ban') {
        dispatch(banUser(id))
        console.log('suspend')
      } else {
        console.log('add credit')
        dispatch(addCredit(credit))
        console.log('add credit')
      }
      handleClose()
      setCredit({
        id: '',
        amount: 0,
      })
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setCredit({ ...credit, [name]: value })
  }

  console.log(credit)
  return (
    <>
      <Paper className={classes.paperForUpdate} elevation={10}>
        <form className={classNames(classes.root, classes.form)}>
          {buttonTitle === 'Delete' || buttonTitle === 'Ban' ? (
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
          ) : (
            <>
              <TextField
                name='id'
                id='id'
                variant='outlined'
                label='ID'
                fullWidth
                value={credit.id}
                onChange={(ev) => {
                  handleChange(ev)
                }}
                className={classes.tField}
              />
              <TextField
                name='amount'
                id='amount'
                variant='outlined'
                type='number'
                label='Amount'
                fullWidth
                value={credit.amount}
                onChange={(ev) => {
                  handleChange(ev)
                }}
                className={classes.tField}
              />
            </>
          )}
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
