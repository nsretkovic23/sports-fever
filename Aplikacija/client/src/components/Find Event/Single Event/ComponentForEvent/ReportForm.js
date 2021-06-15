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
import useStyles from '../../../Create Event/style'

export const ReportForm = ({ idForReport, handleClose, type }) => {
  const classes = useStyles()
  const [report, setReport] = useState({
    idOfReport: idForReport,
    reportTitle: '',
    reportDescription: '',
    typeOfReport: type,
  })

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setReport({ ...report, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (report.reportTitle && report.reportDescription) {
      //dispatch(reportEvent(report))
      console.log(report)
      handleClose()
    }
  }

  return (
    <>
      <Paper className={classes.paperForUpdate} elevation={10}>
        <form className={classNames(classes.root, classes.form)}>
          <TextField
            name='reportTitle'
            id='reportTitle'
            variant='outlined'
            label='Title'
            fullWidth
            value={report.reportTitle}
            onChange={handleChange}
            className={classes.tField}
          />
          <TextField
            id='reportDescription'
            label='Description:'
            name='reportDescription'
            variant='outlined'
            multiline
            rowsMax={5}
            fullWidth
            value={report.reportDescription}
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
