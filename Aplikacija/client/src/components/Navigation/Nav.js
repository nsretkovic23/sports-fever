import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import SportsIcon from '@material-ui/icons/Sports'
import classNames from 'classnames'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Switch,
  FormGroup,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core'
import {
  Rowing,
  MenuIcon,
  AccountCircle,
  FormControlLabel,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#059dc0',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: '10px',
    flexGrow: 1,
    fontWeight: 'bold',
  },
  headerOptions: {
    display: 'flex',

    justifyContent: 'space-evenly',
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    color: 'black',
    marginRight: theme.spacing(2),
    fontSize: '14px',
    textTransform: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  buttonSignIn: {
    backgroundColor: '#6AF2F0',
    '&:hover': {
      backgroundColor: '#6AF2F0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
}))

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
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const handleLogout = (ev) => {
    ev.preventDefault()
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
              SportsFever
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
                            pathname: `/userProfile/.${user.result._id}`,
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

/*
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { Rowing } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  header: {
    backgroundColor: "#A4CABC",
    color: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  headerOptions: {
    display: "flex",

    justifyContent: "space-evenly"
  },
  headerButtons: {
    display: "flex",
    flexDirection: "row"
  },
  buttons: {
    //backgroundColor: "#B2473E",
    color: "black",
    marginRight: theme.spacing(2),
    fontSize: "14px",
    textTransform: "none"
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            SportsFever
          </Typography>
            <div>
              <div className={classes.headerButtons}>
                <div className={classes.headerOptions}>
                  <Button className={classes.buttons}>Create Event</Button>
                  <Button className={classes.buttons}>Find Event</Button>
                </div>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
*/
