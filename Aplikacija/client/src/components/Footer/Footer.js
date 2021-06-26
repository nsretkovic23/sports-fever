import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './Footer.css'
import useStyles from './style'

function Footer() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const classes = useStyles()
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='row'>
          {/* Column1 */}
          <div className='col'>
            <h4>SportsFever</h4>
            <h1 className='list-unstyled'>
              <p>Neki tekst da opise SportsFever</p>
            </h1>
          </div>
          {/* Column2 */}
          <div className='col'>
            <h4>Quick Links</h4>
            <ui className='list-unstyled'>
              <li>
                <Link to='/createEvent' className={classes.link}>
                  Create Event
                </Link>
              </li>
              <li>
                <Link to='/' className={classes.link}>
                  Find Event
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/userProfile/${user?.result?._id}`,
                  }}
                  className={classes.link}
                >
                  Profile
                </Link>
              </li>
            </ui>
          </div>
          {/* Column3 */}
          <div className='col'>
            <h4>Contact</h4>
            <ui className='list-unstyled'>
              <li>New York,NY 10012,US</li>
              <li>info@example.com</li>
              <li>+01 234 567 88</li>
              <li>+01 234 567 89</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className='row'>
          <p className='col-sm'>
            &copy;{new Date().getFullYear()} SportsFever | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
