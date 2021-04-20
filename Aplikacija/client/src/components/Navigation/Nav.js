import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const Nav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const token = user?.token
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const handleLogout = (ev) => {
    ev.preventDefault()
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null)
  }

  return (
    <div>
      {user ? (
        <div>
          <p>{user.result.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button>
          <Link to='/authentification'>Sign in</Link>
        </button>
      )}
    </div>
  )
}
