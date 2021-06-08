import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUserById } from '../../actions/authentification'
import { Grid, Avatar, Typography, Button, Paper } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ListIcon from '@material-ui/icons/List'
import useStyles from './style'

export const UserProfile = () => {
  const userr = useSelector((state) => state.auth.authData)
  const [display, setDisplay] = useState('info')
  const location = useLocation()
  const classes = useStyles()
  const _id = location.pathname.split('userProfile/')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserById(_id[1]))
  }, [_id[1], location])

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
              src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              className={classes.large}
            />

            <Typography align='center' variant='h6'>
              {userr?.name}
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
                      Event: {ev.eventId}
                    </Link>
                  </Button>
                ))}
              </>
            ) : (
              <p>Joined events</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
