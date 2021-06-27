import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import { DialogContent, DialogTitle } from '../Find Event/style'
import { Link, useHistory, useLocation } from 'react-router-dom'
import CancelIcon from '@material-ui/icons/Cancel'
import AddIcon from '@material-ui/icons/Add'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { deleteEvent } from '../../actions/event'
import { banUser, addCredit } from '../../actions/admin'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {
  Grid,
  Avatar,
  Typography,
  Button,
  Paper,
  Container,
} from '@material-ui/core'
import ReportIcon from '@material-ui/icons/Report'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import useStyles from './style'
import DeleteIcon from '@material-ui/icons/Delete'
import BlockIcon from '@material-ui/icons/Block'
import {
  getAllReports,
  getAllCredits,
  deleteCredit,
  deleteReport,
} from '../../actions/admin'
import { AdminForm } from './AdminForm'

export const AdminPage = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [display, setDisplay] = useState('reports')
  const classes = useStyles()
  const dispatch = useDispatch()
  const reports = useSelector((state) => state.reports)
  const credits = useSelector((state) => state.credits)
  const [open, setOpen] = useState({
    state: false,
    dialogTitle: '',
    buttonTitle: '',
  })
  const history = useHistory()
  const handleClose = () => {
    setOpen({ ...open, state: false })
  }
  useEffect(() => {
    dispatch(getAllCredits())
    dispatch(getAllReports())
  }, [])

  console.log(credits)
  return (
    <>
      <Grid container direction='row' className={classes.container}>
        <Grid
          container
          item
          xs={3}
          direcrtion='column'
          className={classes.sideBar}
        >
          <Grid item className={classes.sideBarAvatar}>
            <Avatar
              alt={`${user?.result?.name}`}
              src={
                user?.result?.profileImage ||
                'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              }
              className={classes.large}
            />

            <Typography align='center' variant='h6'>
              {user?.result?.name}
            </Typography>
            <Typography align='center'>Admin Dashboard</Typography>
          </Grid>
          <Grid
            container
            item
            direction='column'
            className={classes.sideBarButtons}
          >
            <Button
              color='inherit'
              startIcon={<ReportIcon></ReportIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setDisplay('reports')
              }}
            >
              Reports
            </Button>
            <Button
              color='inherit'
              startIcon={<CreditCardIcon></CreditCardIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setDisplay('credits')
              }}
            >
              Credits
            </Button>
            <Button
              color='inherit'
              startIcon={<DeleteIcon></DeleteIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setOpen({
                  state: true,
                  dialogTitle: 'Delete Event',
                  buttonTitle: 'Delete',
                })
              }}
            >
              Delete Event
            </Button>
            <Button
              color='inherit'
              startIcon={<BlockIcon></BlockIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setOpen({
                  state: true,
                  dialogTitle: 'Ban User',
                  buttonTitle: 'Ban',
                })
              }}
            >
              Ban User
            </Button>
            <Button
              color='inherit'
              startIcon={<AddIcon></AddIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setOpen({
                  state: true,
                  dialogTitle: 'Add credit',
                  buttonTitle: 'Add',
                })
              }}
            >
              Add credit
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={8}
          direction='column'
          className={classes.content}
        >
          <Paper className={classes.paper} elevation={10}>
            {display === 'reports'
              ? reports?.map((el) => {
                  return (
                    <Container className={classes.reportContainer}>
                      <Container className={classes.infoGroup}>
                        <Typography className={classes.typography}>
                          Type: {el.type}
                        </Typography>
                        <Typography className={classes.typography}>
                          Title: {el.title}
                        </Typography>
                        <Typography className={classes.typography}>
                          Desc: {el.description}
                        </Typography>
                      </Container>
                      <Container className={classes.buttonGroup}>
                        <Button
                          startIcon={<CancelIcon></CancelIcon>}
                          value={el._id}
                          onClick={(ev) => {
                            ev.preventDefault()
                            dispatch(deleteReport(el._id))
                          }}
                        ></Button>
                        <Button
                          startIcon={<VisibilityIcon></VisibilityIcon>}
                          value={el._id}
                          onClick={(ev) => {
                            ev.preventDefault()
                            if (el.type === 'Event')
                              history.push(`/singleEvent/${el.reportedThingId}`)
                            else
                              history.push(`/userProfile/${el.reportedThingId}`)
                          }}
                        ></Button>
                        <Button
                          startIcon={<CheckBoxIcon></CheckBoxIcon>}
                          value={el._id}
                          onClick={(ev) => {
                            ev.preventDefault()
                            if (ev.type === 'Event') {
                              dispatch(
                                deleteEvent(
                                  el.reportedThingId,
                                  user?.result?._id
                                )
                              )
                              console.log('deleted')
                              dispatch(deleteReport(el._id))
                            } else if (el.type === 'User') {
                              dispatch(banUser(el.reportedThingId))
                              console.log('suspend')
                              dispatch(deleteReport(el._id))
                            }
                          }}
                        ></Button>
                      </Container>
                    </Container>
                  )
                })
              : credits?.map((el) => {
                  return (
                    <Container className={classes.reportContainer}>
                      <Container className={classes.infoGroup}>
                        <Typography className={classes.typography}>
                          Amount: {el.amount}
                        </Typography>
                        <Typography className={classes.typography}>
                          <img src={el.receipt} className={classes.img} />
                        </Typography>
                      </Container>
                      <Container className={classes.buttonGroup}>
                        <Button
                          startIcon={<CancelIcon></CancelIcon>}
                          value={el._id}
                          onClick={(ev) => {
                            ev.preventDefault()
                            dispatch(deleteCredit(el._id))
                          }}
                        ></Button>
                        <Button
                          startIcon={<VisibilityIcon></VisibilityIcon>}
                          value={el._id}
                          onClick={(ev) => {
                            ev.preventDefault()
                            history.push(`/userProfile/${el.userId}`)
                          }}
                        ></Button>
                        <Button
                          startIcon={<CheckBoxIcon></CheckBoxIcon>}
                          value={el._id}
                          onClick={(ev) => {
                            ev.preventDefault()
                            dispatch(
                              addCredit({
                                id: el.userId,
                                amount: el.amount,
                              })
                            )
                            dispatch(deleteCredit(el._id))
                          }}
                        ></Button>
                      </Container>
                    </Container>
                  )
                })}
          </Paper>
          <Dialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={open.state}
          >
            <DialogTitle id='customized-dialog-title' onClose={handleClose}>
              {open.dialogTitle}
            </DialogTitle>
            <DialogContent dividers>
              <AdminForm
                buttonTitle={open.buttonTitle}
                userId={user?.result?._id}
                handleClose={handleClose}
              ></AdminForm>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}
