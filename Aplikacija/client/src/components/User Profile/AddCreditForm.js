import React, { useState } from 'react'
import { Container, Paper, TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from '../Create Event/style'
import FileBase from 'react-file-base64'
import { askForCredit } from '../../actions/authentification'
import { useDispatch } from 'react-redux'

export const AddCreditForm = ({ idForUser, handleClose }) => {
  const classes = useStyles()
  const [creditRequest, setCreditRequest] = useState({
    userId: idForUser,
    amount: '',
    receipt: '',
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setCreditRequest({ ...creditRequest, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (creditRequest.amount && creditRequest.receipt) {
      dispatch(askForCredit(creditRequest))
      console.log(creditRequest)
      handleClose()
    }
  }

  return (
    <>
      <Paper className={classes.paperForUpdate} elevation={10}>
        <form className={classNames(classes.root, classes.form)}>
          <TextField
            name='amount'
            id='amount'
            variant='outlined'
            label='Amount'
            type='number'
            fullWidth
            value={creditRequest.credit}
            onChange={handleChange}
            className={classes.tField}
          />
          <Container className={classes.fileInput}>
            Proof of payment:
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setCreditRequest({ ...creditRequest, receipt: base64 })
              }
            />
          </Container>
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
