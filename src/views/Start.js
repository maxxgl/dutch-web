import React, { Component } from 'react'
import '../css/Start.css'
import { Link } from 'react-router-dom'
import logo from '../static/logotype_white.svg'
import Fullpage from '../components/Fullpage'
import Button from '../components/Button'

class Start extends Component {
  render() {
    return (
      <Fullpage color='white' textAlign='center' className='start-wrap'>
        <div id='start'>
          <img src={logo} alt='logo' className='logo'/>
          <h3>Make real connections, together.</h3>
          <Link to='/signup'>
            <Button>Sign Up</Button>
          </Link>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
          <div>
           <Button primary>About</Button>
          </div>
        </div>
      </Fullpage>
    )
  }
}

export default Start
