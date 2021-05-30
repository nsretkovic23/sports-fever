import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUserById } from '../../actions/authentification'
import { Grid, Avatar, Typography, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ListIcon from '@material-ui/icons/List'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    alignSelf: 'center',
  },
  sideBar: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    margin: '20px 20px',
    backgroundColor: '#6af2f0',
    height: '100%',
  },
  content: {
    margin: '20px 20px',
    height: '100%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    backgroundColor: '#BEBEBE',
  },
  sideBarButtons: {
    marginTop: '10px',
    alignSelf: 'center',
    padding: '5px',
    backgroundColor: '#6af2f0',
  },

  sideBarAvatar: {
    alignSelf: 'center',
    padding: '5px',
    backgroundColor: '#6af2f0',
    borderBottom: '1px solid grey',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  button: {
    width: '250px',
    alignSelf: 'center',
    margin: '10px 10px',
  },
  paper: {
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

export const UserProfile = () => {
  const userr = useSelector((state) => state.auth.authData)
  const [display, setDisplay] = useState('info')
  const location = useLocation()
  const classes = useStyles()
  const _id = location.pathname.split('.')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserById(_id[1]))
  }, [_id[1], location])

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
              src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
              className={classes.large}
            />

            <Typography align='center' variant='h6'>
              {userr?.name}
            </Typography>
          </Grid>
          <Grid item direction='column' className={classes.sideBarButtons}>
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
        <Grid item xs={8} direction='column' className={classes.content}>
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
                        pathname: `/singleEvent/.${ev.eventId}`,
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
