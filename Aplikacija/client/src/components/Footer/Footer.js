import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './Footer.css'
import useStyles from './style'
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';

function Footer() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const classes = useStyles()
  return (
    <>
        <div className='row'>
          {/* Column1 */}
          <div className='col'>
            <h4>SportsFever</h4>
            <h1 className='list-unstyled'>
              <p>Find sport events you are interested about!</p>
            </h1>
          </div>
          {/* Column2 */}
          <div className='col2'>
            <h4>Quick Links</h4>
            <ul className='list-unstyled'>
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
            </ul>
          </div>
          {/* Column3 */}
          <div className='col3'>
            <h4>Contact</h4>
            <ul className='list-unstyled'>
              <li><HomeIcon fontSize={"small"}></HomeIcon>  Nis,18000,RS</li>
              <li><EmailIcon fontSize={"small"}></EmailIcon>  info@sportsfever.com</li>
              <li><PhoneIcon fontSize={"small"}></PhoneIcon>  +381 234 567 88</li>
              <li><PrintIcon fontSize={"small"}></PrintIcon>  +381 234 567 89</li>
            </ul>
          </div>
        
      </div>
      <hr />
      <div className='copyright'>
      <p className='col-sm'>
        &copy;{new Date().getFullYear()} SportsFever | All rights reserved |
        Terms Of Service | Privacy
      </p>
    </div>
 </>
  )
}

export default Footer
