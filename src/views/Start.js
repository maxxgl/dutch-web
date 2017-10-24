import React, { Component } from 'react'
import '../css/Start.css'
import logo from '../static/logotype_white.svg'
import Fullpage from '../components/Fullpage'
import Button from '../components/Button'
import { Column } from '../components/Grid'

class Start extends Component {
  render() {
    return (
      <Fullpage background='#61c5c1' color='white' textAlign='center'>
        <div id='login'>
          <img src={logo} alt='logo' className='logo'/>
          <h3>Make real connections, together</h3>
          <Button>Sign Up</Button>
          <Button>Login</Button>
          <div>
           <Button primary>About</Button>
          </div>
        </div>
      </Fullpage>
    )
  }
}

export default Start
