import React from 'react'

import { FindEventPage } from './components/Find Event/FindEventPage'
import { Event } from './components/Find Event/Single Event/Event'
import { CreateEvent } from './components/Create Event/CreateEvent'
import { Nav } from './components/Navigation/Nav'
import { Authentification } from './components/Authentification/Authentification'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserProfile } from './components/User Profile/UserProfile'
import { Grid } from '@material-ui/core'

const App = () => {
  return (
    <>
      <Grid container direction='column'>
        <Router>
          <Grid item>
            <Nav />
          </Grid>
          <Grid item>
            <Switch>
              <Route path='/' exact>
                <FindEventPage></FindEventPage>
              </Route>
              <Route path='/createEvent' exact>
                <CreateEvent></CreateEvent>
              </Route>
              <Route
                path='/authentification'
                exact
                component={Authentification}
              ></Route>
              <Route path='/singleEvent'>
                <Event></Event>
              </Route>
              <Route path='/userProfile'>
                <UserProfile></UserProfile>
              </Route>
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  )
}
export default App
