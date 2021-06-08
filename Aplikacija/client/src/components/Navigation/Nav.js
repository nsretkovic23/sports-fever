import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SportsIcon from '@material-ui/icons/Sports'
import classNames from 'classnames'
import decode from 'jwt-decode'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core'
import useStyles from './style'

export const Nav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout()
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const handleLogout = (ev) => {
    ev?.preventDefault()
    dispatch({ type: 'LOGOUT' })
    handleClose()
    history.push('/')
    setUser(null)
  }

  return (
    <div className={classes.root}>
      <div>
        <AppBar position='static' className={classes.header}>
          <Toolbar>
            <SportsIcon fontSize='large'></SportsIcon>
            <Typography variant='h4' className={classes.title}>
              <Link to='/' className={classes.link}>
                SportsFever
              </Link>
            </Typography>
            <div>
              <div className={classes.headerButtons}>
                <div className={classes.headerOptions}>
                  <Button className={classes.buttons}>
                    <Link to='/createEvent' className={classes.link}>
                      Create Event
                    </Link>
                  </Button>
                  <Button className={classes.buttons}>
                    {' '}
                    <Link to='/' className={classes.link}>
                      Find Event
                    </Link>
                  </Button>
                </div>
                {user ? (
                  <>
                    <Avatar
                      alt={user?.result.name}
                      src='/static/images/avatar/1.jpg'
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleMenu}
                      color='inherit'
                    />
                    <Menu
                      id='menu-appbar'
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link
                          to={{
                            pathname: `/userProfile/${user.result._id}`,
                          }}
                          className={classes.link}
                        >
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    varient='contained'
                    className={classNames(
                      classes.buttonSignIn,
                      classes.buttons
                    )}
                  >
                    <Link to='/authentification' className={classes.link}>
                      Sign in
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}
