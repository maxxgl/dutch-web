import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import logo from '../static/logotype_green.svg'
import circle from '../static/circle.svg'
import { Grid, Column } from '../components/Grid'
import TextField from '../components/TextField'
import Header from '../components/Header'

export default class Signup extends Component {
  render() {
    return (
      <Fullpage>
        <SignupHeader />
        <Grid className='signup-content'>
          <Column size='u-2-24' />
          <Column size='u-9-24'>
            <TextField type='email' placeholder='Email' />
            <TextField type='password' placeholder='Password'/>
          </Column>
          <Column size='u-2-24' />
          <Column size='u-9-24'>
            <Header>What is your email address?</Header>
            <div>So we can provide you the best experience we will ask to you log into your email, this way we can get an idea of your schedule.</div>
          </Column>
          <Column size='u-2-24' />
        </Grid>
      </Fullpage>
    )
  }
}

const SignupHeader = () => (
  <Grid>
    <Column size='u-1-4'>
      <img src={logo} alt='logo' className='signup-logo'/>
    </Column>
    <Column size='u-1-2 circle-column'>
     <Circle /><Circle /><Circle /><Circle /><Circle /><Circle /><Circle />
    </Column>
    <Column size='u-1-4' />
  </Grid>
)

const Circle = () => (
  <img src={circle} alt='circle' className='circle'/>
)
