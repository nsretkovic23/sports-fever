import React from 'react'
import { FindEventPage } from './components/Find Event/FindEventPage'
import { Event } from './components/Find Event/Single Event/Event'
import { CreateEvent } from './components/Create Event/CreateEvent'
import { Nav } from './components/Navigation/Nav'
import { Authentification } from './components/Authentification/Authentification'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserProfile } from './components/User Profile/UserProfile'
import { Container, Grid } from '@material-ui/core'
import { AdminPage } from './components/AdminDashboard/AdminPage'
import Footer from './components/Footer/Footer'
import classNames from 'classnames'

const App = () => {
  return (
    <>
      <Grid container direction='column' wrap='nowrap'>
        <Router>
            <Grid item xs={12}>
            <Nav />
            </Grid>
          <Grid item>
            <Switch>
              <Route path='/' exact>
                <FindEventPage></FindEventPage>
                <Grid className={classNames('footerCont', 'createEvent')}>
                  <Footer></Footer>
                </Grid>
              </Route>
              <Route path='/createEvent' exact>
                <CreateEvent></CreateEvent>
                <Grid className={classNames('footerCont', 'createEvent')}>
                  <Footer></Footer>
                </Grid>
              </Route>
              <Route path='/authentification' exact>
                <Authentification></Authentification>
                <Grid className={classNames('footerCont', 'userProfile')}>
                  <Footer></Footer>
                </Grid>
              </Route>
              <Route path='/singleEvent'>
                <Event></Event>
                <Grid className={classNames('footerCont', 'event')}>
                  <Footer></Footer>
                </Grid>
              </Route>
              <Route path='/userProfile'>
                <UserProfile></UserProfile>
                <Grid className={classNames('footerCont', 'userProfile')}>
                  <Footer></Footer>
                </Grid>
              </Route>
              <Route path='/admin'>
                <AdminPage></AdminPage>
                <Grid className={classNames('footerCont', 'admin')}>
                  <Footer></Footer>
                </Grid>
              </Route>
            </Switch>
          </Grid>
        </Router>
      </Grid>
    </>
  )
}
export default App
