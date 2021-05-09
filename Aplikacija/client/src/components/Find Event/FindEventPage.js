import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getEvents } from '../../actions/event'
import '../../styles.css'
import { FindForm } from './FindForm'
import { Nav } from '../Navigation/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Authentification } from '../Authentification/Authentification'

export const FindEventPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  return (
    <Router>
      <div className='divFindEventPage'>
        <Nav />
        <Switch>
          <Route exact path='/' component={FindForm}></Route>
          <Route
            path='/authentification'
            exact
            component={Authentification}
          ></Route>
        </Switch>
      </div>
    </Router>
  )
}
