import React from 'react'
import '../../styles.css'
import { FindForm } from './FindForm'
import { Event } from './Event'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const FindEventPage = () => {
  return (
    <div className='divFindEventPage'>
      <Router>
        <Switch>
          <Route exact path='/' component={FindForm}></Route>
          <Route path='/singleEvent' exact component={Event}></Route>
        </Switch>
      </Router>
    </div>
  )
}
