import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/authentification'

export const Authentification = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const dispatch = useDispatch()
  const history = useHistory()

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

  const googleFailure = (ev) => {
    ev.preventDefault()
    alert('Google Sign In was unsuccessful.')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {isSignup ? (
          <>
            <div>
              <label>First Name</label>
              <input
                type='text'
                name='firstName'
                value={data.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last name</label>
              <input
                type='text'
                name='lastName'
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          </>
        ) : null}
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='text'
            name='password'
            value={data.password}
            onChange={handleChange}
          />
        </div>
        {isSignup ? (
          <>
            <div>
              <label>Confirme password</label>
              <input
                type='text'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </>
        ) : null}
        <button type='submit'>{isSignup ? 'Sign up' : 'Sign in'} </button>
        <GoogleLogin
          clientId='550565549351-jj2d1n0frhisdl9443afb2ou9j4966dr.apps.googleusercontent.com'
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Google Sign In
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
        />
        <button onClick={switchMode}>
          {isSignup
            ? 'Already have an account, sign in'
            : 'Dont have an account, sign up'}
        </button>
      </form>
    </>
  )
}
