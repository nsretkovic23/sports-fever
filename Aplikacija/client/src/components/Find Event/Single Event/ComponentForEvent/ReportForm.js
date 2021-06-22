import React, { useState } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from '../../../Create Event/style'
import { sendReport } from '../../../../actions/event'
import { useDispatch } from 'react-redux'

export const ReportForm = ({ idForReport, handleClose, type, userID }) => {
  const classes = useStyles()
  const [report, setReport] = useState({
    reportedThingId: idForReport,
    userThatReportedId: userID,
    title: '',
    description: '',
    type: type,
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setReport({ ...report, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (report.title && report.description) {
      dispatch(sendReport(report))
      console.log(report)
      handleClose()
    }
  }

  return (
    <>
      <Paper className={classes.paperForUpdate} elevation={10}>
        <form className={classNames(classes.root, classes.form)}>
          <TextField
            name='title'
            id='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={report.title}
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
            value={report.description}
            onChange={handleChange}
            className={classes.tField}
          />
          <Button
            varient='contained'
            type='submit'
            onClick={handleSubmit}
            className={classes.buttonReport}
          >
            Send Report
          </Button>
        </form>
      </Paper>
    </>
  )
}
