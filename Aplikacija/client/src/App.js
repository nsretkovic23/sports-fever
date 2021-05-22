import React from 'react'

import { FindEventPage } from './components/Find Event/FindEventPage'
import { Event } from './components/Find Event/Event'
import { CreateEvent } from './components/Create Event/CreateEvent'
import { Nav } from './components/Navigation/Nav'
import { Authentification } from './components/Authentification/Authentification'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createEvent } from './api'

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact>
            <FindEventPage></FindEventPage>
            <CreateEvent></CreateEvent>
          </Route>
          <Route
            path='/authentification'
            exact
            component={Authentification}
          ></Route>
          <Route path='/singleEvent' exact>
            <Event></Event>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
