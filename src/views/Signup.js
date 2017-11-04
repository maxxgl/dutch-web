import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import logo from '../static/logotype_green.svg'
import next from '../static/next_icon.svg'
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'
import { Grid, Column } from '../components/Grid'
import TextField from '../components/TextField'
import Header from '../components/Header'
import findLocation from '../static/findlocation_icon.svg'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 0, email: '', password: '', range: '25', zip: '', 
      traits: [], budget: 0, gender: '', seekingGender: '', age: 0, 
      youngest: 0, oldest: 0 }
  }

  handlePageChange = (e) => {
    this.setState({ page: parseInt(e.target.id, 10) })
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  pages = [
    <Email key={1} change={this.onChange} />,
    <Location key={2} change={this.onChange} />,
    <Traits key={3} change={this.onChange} />,
    <Money key={4} change={this.onChange} />,
    <Gender key={5} change={this.onChange} />,
    <Age key={6} change={this.onChange} />
  ]

  render() {
    return (
      <Fullpage>
        <Grid>
          <Column size='u-1-4'>
            <img src={logo} alt='logo' className='signup-logo'/>
          </Column>
          <Column size='u-1-2 circle-column'>
            <nav>
              <Circles
                page={this.state.page}
                pageCount={this.pages.length}
                change={this.handlePageChange}
              />
            </nav>
          </Column>
          <Column size='u-1-4' />
        </Grid>
        {this.pages[this.state.page]}
        {console.log(this.state)}
      </Fullpage>
    )
  }
}

const Circles = (props) => {
  let circles = []
  for (var i = 0; i < props.pageCount; i++) {
    let circleType = i === props.page ? circleGreen : circle
    circles.push(
      <img
        key={i}
        src={circleType}
        id={i}
        onClick={props.change}
        alt='circle'
        className='circle'
      />
    )
  }
  return circles
}

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

const Location = (props) => (
  <SignupContent>
    <div>
      <div style={{ textAlign: 'center' }}>{props.range}</div>
      <span>1</span>
      <input type='range' onChange={props.change} name='range'
        defaultValue='25' min='1' max='50' />
      <span>50</span>
    </div>
    <div>
      <Header>
        What is your location, and how far will you travel for a date
      </Header>
      <TextField type='text' onChange={props.change} placeholder='Zip Code'
        name='zip' />
      <div>
        <img src={findLocation} alt='location' className='location'/>
        <span>Find My Location</span>
      </div>
    </div>
  </SignupContent>
)

const Traits = () => (
  <SignupContent>
    <div>
      <TextField type='text' placeholder='Traits' />
    </div>
    <div>
      <Header>What are 5 traits you look for in a relationship?</Header>
      <div>Use single words.</div>
    </div>
  </SignupContent>
)

const Money = () => (
  <SignupContent>
    <div>
      <input type="range" min="1" max="100" />
    </div>
    <div>
      <Header>About how much are you willing to spend on a date?</Header>
      <div>You can change this later.</div>
    </div>
  </SignupContent>
)

const Gender = () => (
  <SignupContent>
    <div>
    </div>
    <div>
      <Header>What are you looking for?</Header>
      <div>You can select more than one.</div>
    </div>
  </SignupContent>
)

const Age = () => (
  <SignupContent>
    <div>
      <TextField type='number' placeholder='I am' />
      <TextField type='number' placeholder='Young' />
      <TextField type='number' placeholder='Old' />
    </div>
    <div>
      <Header>How old are you?</Header>
      <div>What age range are you looking for?</div>
    </div>
  </SignupContent>
)
