import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/authentification'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './style'
import Input from './InputComponent'
import Icon from './icon'
import FileBase from 'react-file-base64'

export const Authentification = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
  })

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (isSignup) {
      dispatch(signup(userData, history))
    } else {
      dispatch(signin(userData, history))
    }
  }

  const handleChange = (ev) => {
    setUserData({ ...userData, [ev.target.name]: ev.target.value })
  }

  const switchMode = (ev) => {
    ev.preventDefault()
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {isSignup ? 'Sign up' : 'Sign in'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name='firstName'
                    label='First Name'
                    handleChange={handleChange}
                    autoFocus
                    half
                    value={userData.firstName}
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                    value={userData.lastName}
                  />
                </>
              )}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
                value={userData.email}
              />
              <Input
                name='password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
                value={userData.password}
              />
              {isSignup && (
                <>
                  <Input
                    name='confirmPassword'
                    label='Repeat Password'
                    handleChange={handleChange}
                    type='password'
                    value={userData.confirmPassword}
                  />
                  <Container className={classes.fileInput}>
                    <Typography gutterBottom='true'>
                      Choose profile image:
                    </Typography>
                    <FileBase
                      type='file'
                      multiple={false}
                      onDone={({ base64 }) =>
                        setUserData({
                          ...userData,
                          profileImage: base64,
                        })
                      }
                    />
                  </Container>
                </>
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  )
}

/*
 const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: AUTH, userData: { result, token } })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = (ev) => {
    ev.preventDefault()
    alert('Google Sign In was unsuccessful.')
  }
  
<GoogleLogin
              clientId={process.env.GOOGLE_ID}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy='single_host_origin'
            /> */
