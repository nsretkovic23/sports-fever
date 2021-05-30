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

export const Authentification = () => {
  const [isSignup, setIsSignup] = useState(false)
  const classes = useStyles()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (isSignup) {
      dispatch(signup(data, history))
    } else {
      dispatch(signin(data, history))
    }
  }

  const handleChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value })
  }

  const switchMode = (ev) => {
    ev.preventDefault()
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: AUTH, data: { result, token } })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = (ev) => {
    ev.preventDefault()
    alert('Google Sign In was unsuccessful.')
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
                    value={data.firstName}
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                    value={data.lastName}
                  />
                </>
              )}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
                value={data.email}
              />
              <Input
                name='password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
                value={data.password}
              />
              {isSignup && (
                <Input
                  name='confirmPassword'
                  label='Repeat Password'
                  handleChange={handleChange}
                  type='password'
                  value={data.confirmPassword}
                />
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
            <GoogleLogin
              clientId='550565549351-jj2d1n0frhisdl9443afb2ou9j4966dr.apps.googleusercontent.com'
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
            />
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
