import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import logo from '../static/logotype_green.svg'
import circle from '../static/circle.svg'
import { Grid, Column } from '../components/Grid'

export default class Signup extends Component {
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
