import React, { Component } from 'react'
import '../css/Login.css'
import logo from '../static/logotype_white.svg'
import Fullpage from '../components/Fullpage'

class Login extends Component {
  render() {
    return (
      <Fullpage background='#61c5c1' color='white' textAlign='center'>
        <img src={logo} alt='logo' className='logo'/>
        <h3>Make real connections, together</h3>
      </Fullpage>
    )
  }
}

export default Login
