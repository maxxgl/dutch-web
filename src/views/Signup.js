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
import female from '../static/woman_icon.svg'
import male from '../static/man_icon.svg'
import trans from '../static/trans_icon.svg'
import Button from '../components/Button'
import { consumer } from '../utils/consumer'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 6, email: '', password: '', range: '25', zip: '',
      traits: [], budget: 0, gender: '', seeking: '', age: 0, 
      youngest: 0, oldest: 0, submitted: 0 }
    this.pages()
  }

  handlePageChange = (e) => {
    this.setState({ page: parseInt(e.target.id, 10) })
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  newTrait = (value) => {
    let list = this.state.traits
    list.push(value)
    this.setState({traits: list})
  }

  setGender = (e) => this.setState({gender: e.target.id})
  setSeeking = (e) => this.setState({seeking: e.target.id})

  pages = (props) => {
    return [
      <Email key={1} change={this.onChange} />,
      <Location key={2} change={this.onChange} />,
      <Traits key={3} change={this.onChange} traits={this.state.traits}
        newTrait={this.newTrait} />,
      <Money key={4} change={this.onChange} />,
      <Gender key={5} change={this.onChange} setGender={this.setGender}
        setSeeking={this.setSeeking} gender={this.state.gender}
        seeking={this.state.seeking} />,
      <Age key={6} change={this.onChange} />,
      <Submitted key={7} info={this.state} />
    ]
  }

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
                pageCount={this.pages().length}
                change={this.handlePageChange}
              />
            </nav>
          </Column>
          <Column size='u-1-4' />
        </Grid>
        {this.pages()[this.state.page]}
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

const Email = (props) => (
  <SignupContent>
    <div>
      <TextField type='email' onChange={props.change} placeholder='Email'
      name='email' />
      <TextField type='password' onChange={props.change} placeholder='Password'
      name='password' />
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

const Traits = (props) => {
  return (
    <SignupContent>
      <div>
        <TextField type='text'  placeholder='Traits' name='traits'
          handleKeyPress={(e) => {
            if (e.key === 'Enter') {
              props.newTrait(e.target.value)
              e.target.value = ''
            }}}
        />
        <div>
          {props.traits.map((trait) =>
            <Header key={trait}>
              {trait}
            </Header>
          )} 
        </div>
      </div>
      <div>
        <Header>What are 5 traits you look for in a relationship?</Header>
        <div>Use single words.</div>
      </div>
    </SignupContent>
  )
}

const Money = (props) => (
  <SignupContent>
    <div>
      <span>$</span>
      <input type='range' onChange={props.change} name='budget'
        defaultValue='50' min='0' max='100' />
      <span>$$$$</span>
    </div>
    <div>
      <Header>About how much are you willing to spend on a date?</Header>
      <div>You can change this later.</div>
    </div>
  </SignupContent>
)

const Gender = (props) => (
  <SignupContent>
    <div>
      <Header>I'm a {props.gender}</Header>
      <GenderButtons id='gender' onChange={props.setGender} />
      <Header>Seeking a {props.seeking}</Header>
      <GenderButtons onChange={props.setSeeking} />
    </div>
    <div>
      <Header>What are you looking for?</Header>
      <div>You can select more than one.</div>
    </div>
  </SignupContent>
)

const GenderButtons = (props) => (
  <Grid>
    <Column size='u-1-3 gender-buttons' onClick={props.onChange} id='Woman'>
      <img src={female} className='gender-icons' alt='female' id='Woman' />
    </Column>
    <Column size='u-1-3 gender-buttons' onClick={props.onChange} id='Man'>
      <img src={male} className='gender-icons' alt='male' id='Man' />
    </Column>
    <Column size='u-1-3 gender-buttons' onClick={props.onChange} id='Non-Binary'>
      <img src={trans} className='gender-icons' alt='trans' id='Non-Binary' />
    </Column>
  </Grid>
)

const Age = (props) => (
  <SignupContent>
    <div>
      <TextField type='number' onChange={props.change} 
        name='age' placeholder='I am' />
      <TextField type='number' onChange={props.change} 
        name='youngest' placeholder='Young' />
      <TextField type='number' onChange={props.change} 
        name='oldest' placeholder='Old' />
    </div>
    <div>
      <Header>How old are you?</Header>
      <div>What age range are you looking for?</div>
    </div>
  </SignupContent>
)

const Submitted = (props) => {
  if (props.info.submitted === 0) {
    return (
      <SignupContent>
        <div>{Object.keys(props.info).map((item, i) => (
            <div key={i}>
              {item}: {props.info[item]}
            </div>
        ))}</div>
        <div>
        <Button primary onClick={consumer}>Create Account</Button>
        </div>
      </SignupContent>
    )
  }
  return (
    <SignupContent>
      <div id='submit-box'></div>
      <div>
        <Header>That’s it! Get ready for some sweet dates.</Header>
        <div>If you need to change anything, you can do-so in your account settings.</div>
      </div>
    </SignupContent>
  )
}
