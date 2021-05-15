import React from 'react'
//import { useDispatch } from 'react-redux'
//import { getEvents } from '../../actions/event'
import '../../styles.css'
import { FindForm } from './FindForm'
import { Event } from './Event'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const FindEventPage = () => {
  /*const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])
*/
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
