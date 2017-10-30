import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import logo from '../static/logotype_green.svg'
import { Link, Route } from 'react-router-dom'
import next from '../static/next_icon.svg'
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'
import { Grid, Column } from '../components/Grid'
import TextField from '../components/TextField'
import Header from '../components/Header'

export default class Signup extends Component {
  render() {
    return (
      <Fullpage>
        <SignupHeader match={this.props.match}/>
        <Route exact path={ this.props.match.url + '/email' } component={Email}/>
      </Fullpage>
    )
  }
}

const SignupHeader = ({ match }) => (
  <Grid>
    <Column size='u-1-4'>
      <img src={logo} alt='logo' className='signup-logo'/>
    </Column>
    <Column size='u-1-2 circle-column'>
      <nav>
        <Circle to={match.url + '/email'} active={true}/>
        <Circle to={match.url + '/location'} active={true}/>
        <Circle to={match.url + '/money'} active={true}/>
      </nav>
    </Column>
    <Column size='u-1-4' />
  </Grid>
)

const Circle = ({ to, active }) => (
  <Route path={to} exact={active} children={({ match }) => {
    let circleType = <img src={circle} alt='circle' className='circle'/>
    if (match) {
      circleType = <img src={circleGreen} alt='activeCircle' className='circle'/>
    }
    return (
      <Link to={to}>
        {circleType}
      </Link>
  )}}/>
)

class SignupContent extends Component {
  render() {
    return (
      <Grid className='signup-content'>
        <Column size='u-2-24' />
        <Column size='u-8-24'>
          {this.props.children[0]}
        </Column>
        <Column size='u-2-24' />
        <Column size='u-9-24'>
          {this.props.children[1]}
        </Column>
        <Column size='u-3-24'>
          <img src={next} alt='next' className='icon-centered'/>
        </Column>
      </Grid>
    )
  }
}

const Email = () => (
  <SignupContent>
    <div>
      <TextField type='email' placeholder='Email' />
      <TextField type='password' placeholder='Password'/>
    </div>
    <div>
      <Header>What is your email address?</Header>
      <div>So we can provide you the best experience we will ask to you log into your email, this way we can get an idea of your schedule.</div>
    </div>
  </SignupContent>
)
