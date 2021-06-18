import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUserById } from '../../actions/authentification'
import { Grid, Avatar, Typography, Button, Paper } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ListIcon from '@material-ui/icons/List'
import useStyles from './style'
import GradeIcon from '@material-ui/icons/Grade'
import ReportIcon from '@material-ui/icons/Report'
import { yellow } from '@material-ui/core/colors'
import Dialog from '@material-ui/core/Dialog'
import { DialogContent, DialogTitle } from '../Find Event/style'
import { ReportForm } from '../Find Event/Single Event/ComponentForEvent/ReportForm'
import { AddCreditForm } from './AddCreditForm'
import PaymentIcon from '@material-ui/icons/Payment'

export const UserProfile = () => {
  const userr = useSelector((state) => state.auth.authData)
  const user = JSON.parse(localStorage.getItem('profile'))
  const [display, setDisplay] = useState('info')
  const location = useLocation()
  const classes = useStyles()
  const _id = location.pathname.split('userProfile/')
  const dispatch = useDispatch()
  const [open, setOpen] = useState({
    state: false,
    dialogTitle: '',
    isReport: true,
  })

  useEffect(() => {
    dispatch(getUserById(_id[1]))
  }, [_id[1], location])

  const handleClose = () => {
    setOpen({ ...open, state: false })
  }

  console.log(userr)
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
              alt={`${userr?.name}`}
              src={
                userr?.profileImage ||
                'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              }
              className={classes.large}
            />

            <Typography align='center' variant='h6'>
              {userr?.name}
            </Typography>
            <Typography align='center'>
              {userr?.averageRate}
              <GradeIcon style={{ color: yellow[400] }}></GradeIcon>
            </Typography>
          </Grid>
          <Grid
            container
            item
            direction='column'
            className={classes.sideBarButtons}
          >
            <Button
              color='inherit'
              startIcon={<AccountBoxIcon></AccountBoxIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setDisplay('info')
              }}
            >
              Account
            </Button>
            <Button
              color='inherit'
              startIcon={<ListIcon></ListIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setDisplay('created')
              }}
            >
              Created events
            </Button>
            <Button
              color='inherit'
              startIcon={<ListIcon></ListIcon>}
              fullWidth
              onClick={(ev) => {
                ev.preventDefault()
                setDisplay('joined')
              }}
            >
              Joined events
            </Button>
            {user?.result?._id != _id[1] ? (
              <Button
                color='inherit'
                startIcon={<ReportIcon></ReportIcon>}
                fullWidth
                onClick={(ev) => {
                  ev.preventDefault()
                  setOpen({
                    state: true,
                    dialogTitle: 'Report this user',
                    isReport: true,
                  })
                }}
              >
                Report User
              </Button>
            ) : (
              <Button
                color='inherit'
                startIcon={<PaymentIcon></PaymentIcon>}
                fullWidth
                onClick={(ev) => {
                  ev.preventDefault()
                  setOpen({
                    state: true,
                    dialogTitle: 'Request for credit',
                    isReport: false,
                  })
                }}
              >
                Add Credit
              </Button>
            )}
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
            {display === 'info' ? (
              <>
                <p>Name: {userr?.name}</p>
                <p>Credits: {userr?.credits}</p>
              </>
            ) : display === 'created' ? (
              <>
                {userr?.createdEvents?.map((ev) => (
                  <Button
                    key={ev.eventId}
                    className={classes.button}
                    variant='contained'
                  >
                    <Link
                      to={{
                        pathname: `/singleEvent/${ev.eventId}`,
                      }}
                      className={classes.link}
                    >
                      {ev.eventTitle}
                    </Link>
                  </Button>
                ))}
              </>
            ) : display === 'joined' ? (
              <>
                {userr?.joinedEvents?.map((ev, i) => (
                  <Button
                    key={i}
                    className={classes.button}
                    variant='contained'
                  >
                    <Link
                      to={{
                        pathname: `/singleEvent/${ev.eventId}`,
                      }}
                      className={classes.link}
                    >
                      {ev.eventTitle}
                    </Link>
                  </Button>
                ))}
              </>
            ) : (
              setDisplay('info')
            )}
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
              {open.isReport ? (
                <ReportForm
                  idForReport={_id[1]}
                  handleClose={handleClose}
                  type={'User'}
                  userID={user?.result?._id}
                ></ReportForm>
              ) : (
                <AddCreditForm
                  idForUser={_id[1]}
                  handleClose={handleClose}
                ></AddCreditForm>
              )}
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}
