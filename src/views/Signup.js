import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import logo from '../static/logotype_green.svg'
import { Grid, Column } from '../components/Grid'

class Login extends Component {
  render() {
    return (
      <Fullpage>
        <SignupHeader />
      </Fullpage>
    )
  }
}

const SignupHeader = () => (
  <Grid>
    <Column size='1-4'>
      <img src={logo} alt='logo' className='signup-logo'/>
    </Column>
    <Column size='1-2' />
    <Column size='1-4' />
  </Grid>
)

export default Login
