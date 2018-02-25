import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import ReactSwipe from 'react-swipe'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import logo from '../static/logotype_green.svg'
import next from '../static/next_icon.svg'
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'
import { Grid, Column } from '../components/Grid'
import TextField from '../components/TextField'
import Header from '../components/Header'
import camera from '../static/camera_icon.svg'
import findLocation from '../static/findlocation_icon.svg'
import female from '../static/woman_icon.svg'
import male from '../static/man_icon.svg'
import trans from '../static/trans_icon.svg'
import Button from '../components/Button'
import { consumer } from '../utils/consumer'
import { Redirect } from 'react-router-dom'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { pos: 0, firstName: '', lastName: '', email: '',  age: 0,
      password: '', pictures: [], range: 25, latitude: '', longitude: '',
      likes: [], dislikes: [], budget: 0, gender: '', seeking: '', youngest: 0,
      oldest: 0, submitted: 0, start: '', end: '' }
  }

  nextPage = () => this.swipe.next()
  updatePos = () => this.setState({ pos: this.swipe.getPos() })
  slide = (i) => {
    this.swipe.slide(i)
    this.updatePos()
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})
  newTrait = (value, name) => {
    let list = this.state[name]
    list.push(value)
    this.setState({[name]: list})
  }
        
  setLocation = () => navigator.geolocation.getCurrentPosition((p) => {
    this.setState({latitude: p.coords.latitude, longitude: p.coords.longitude})
  })
  setGender = (e) => this.setState({gender: e.target.id})
  setSeeking = (e) => this.setState({seeking: e.target.id})
  setPictures = (p) => this.setState({pictures: [...this.state.pictures, p]})

  consume = () => {
    consumer('user/', 'POST', this.state)
      .then((response) => {
        if (response) {
          this.setState({submitted: 1})
        }})
  }   

  render() {
    const pages = ([
      <Email change={this.onChange} 
        email={this.state.email} password={this.state.password} />,
      <Pictures change={this.setPictures} pics={this.state.pictures} />,
      <Location change={this.onChange} range={this.state.range}
        setLocation={this.setLocation} latitude={this.state.latitude}
        longitude={this.state.longitude} />,
      <Traits change={this.onChange} traits={this.state.likes}
        newTrait={this.newTrait} />,
      <Traits change={this.onChange} traits={this.state.dislikes}
        newTrait={this.newTrait} dislike />,
      <Money change={this.onChange} />,
      <Gender change={this.onChange} setGender={this.setGender}
        setSeeking={this.setSeeking} gender={this.state.gender}
        seeking={this.state.seeking} />,
      <Age change={this.onChange} />,
      <Schedule change={this.onChange} start={this.state.start}
        end={this.state.end} />,
      <Submit info={this.state} consume={this.consume} />
    ]).map((item, i) => <div key={i}>{item}</div>)
    return (
      <Fullpage>
        <Grid>
          <Column size='u-md-1-4'>
            <img src={logo} alt='logo' className='signup-logo'/>
          </Column>
          <Column size='u-1-1 u-md-1-2 circle-column'>
            <nav>
              <Circles
                page={this.state.pos}
                pageCount={this.swipe ? this.swipe.getNumSlides() : 10}
                slide={this.slide}
              />
            </nav>
          </Column>
          <Column size='u-md-1-4' />
        </Grid>
        <ReactSwipe ref={reactSwipe => this.swipe = reactSwipe}
          swipeOptions={{ callback: this.updatePos, continuous: false,
            disableScroll: true }}>
          {pages}
        </ReactSwipe>
        <div className='signup-next'>
          <img src={next} onClick={this.nextPage} alt='next' id='next'/>
        </div>
      </Fullpage>
    )
  }
}

const Circles = (props) => {
  let circles = []
  for (let i = 0; i < props.pageCount; i++) {
    let circleType = i === props.page ? circleGreen : circle
    circles.push(
      <img key={i} alt='circle' className='circle' src={circleType}
        onClick={() => props.slide(i)}/>
    )
  }
  return circles
}

const SignupContent = (props) => (
  <div>
    <div className='signup-first signup-content'>
      {props.children[0]}
    </div>
    <div className='signup-second signup-content'>
      {props.children[1]}
    </div>
  </div>
)

const Email = (props) => (
  <SignupContent>
    <div>
      <Header>What is your email address?</Header>
      <div>This will also be your username.</div>
    </div>
    <div>
      <TextField type='email' value={props.email} onChange={props.change}
        placeholder='Email' name='email' />
      <TextField type='password' value={props.password} onChange={props.change}
        placeholder='Password' name='password' />
    </div>
  </SignupContent>
)

const Pictures = (props) => (
  <SignupContent>
    <div>
      <Header>Upload, take, or choose 10 pictures of yourself.</Header>
    </div>
    <div>
      <Dropzone
        className="dropzone"
        multiple={true}
        accept="image/png,image/jpeg"
        onDrop={(files) => upload(files, props.change)}>
        <img src={camera} alt='camera' />
      </Dropzone>
      <div className='upload-pics-wrapper' >{props.pics.map((item, i) => (
        <img key={i} src={item} alt='upload' className='upload-pic'/>
      ))}</div>
    </div>
  </SignupContent>
)

const upload = (files, change) => {
  const preset = 'sxeg1qhp'
  const url = 'https://api.cloudinary.com/v1_1/dutch-pictures/upload'
  for (let i = files.length - 1; i >= 0; i--) {
    let img = new Image()
    img.src = window.URL.createObjectURL( files[i] );
    img.onload = () => {
      if (img.naturalHeight !== img.naturalWidth) {
        alert("Image must be square")
        return
      }
      let upload = request.post(url)
                          .field('upload_preset', preset)
                          .field('file', files[i])
      upload.end((err, response) => {
        if (err) {
          throw new Error(err)
        }
        if (response.body.secure_url !== '') {
          change(response.body.secure_url)
        }
      })
    }
  }
}

const Location = (props) => (
  <SignupContent>
    <div>
      <Header>
        What is your location, and how far will you travel for a date
      </Header>
    </div>
    <div>
      <div onClick={props.setLocation}>
        <img src={findLocation} alt='location' className='location'/>
        <span>Find My Location</span>
      </div>
      <div>Latitude: {props.latitude}°</div>
      <div>Longitude: {props.longitude}°</div>
      <div className='range-wrapper'>
        <span className='label'>0</span>
        <input type='range' onChange={props.change} name='range'
          value={props.range} min='0' max='50' />
        <span className='label'>50</span>
        <Header>{props.range} km</Header>
      </div>
    </div>
  </SignupContent>
)

const Traits = (props) => {
  let traitType = "likes"
  let traitText = "What are 5 traits you look for in a relationship?"
  if (props.dislike) {
    traitType = "dislikes"
    traitText = "How about 5 things you just cannot stand?"
  }
  return (
    <SignupContent>
      <div>
        <Header>{traitText}</Header>
        <div>Use single words.</div>
      </div>
      <div>
        <TextField type='text'  placeholder='Traits' name='likes'
          handleKeyPress={(e) => {
            if (e.key === 'Enter') {
              props.newTrait(e.target.value, traitType)
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
    </SignupContent>
  )
}

const Money = (props) => (
  <SignupContent>
    <div>
      <Header>About how much are you willing to spend on a date?</Header>
      <div>You can change this later.</div>
    </div>
    <div>
      <span>$</span>
      <input type='range' onChange={props.change} name='budget'
        defaultValue='50' min='0' max='100' />
      <span>$$$$</span>
    </div>
  </SignupContent>
)

const Gender = (props) => (
  <SignupContent>
    <div>
      <Header>What are you looking for?</Header>
      <div>You can select more than one.</div>
    </div>
    <div>
      <Header>I'm a {props.gender}</Header>
      <GenderButtons id='gender' onChange={props.setGender} />
      <Header>Seeking a {props.seeking}</Header>
      <GenderButtons onChange={props.setSeeking} />
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
      <Header>How old are you?</Header>
      <div>What age range are you looking for?</div>
    </div>
    <div>
      <TextField type='number' onChange={props.change}
        name='age' placeholder='My Age' />
      <div>What age range are you looking for?</div>
      <TextField type='number' onChange={props.change}
        name='youngest' placeholder='Young' className='age'/>
        <span>to</span>
      <TextField type='number' onChange={props.change}
        name='oldest' placeholder='Old' className='age'/>
    </div>
  </SignupContent>
)

const Schedule = (props) => (
  <SignupContent>
    <div>
      <Header>What time are you available each day for dates?</Header>
      <div>You can adjust this later.</div>
    </div>
    <div>
      <input type="time" onChange={props.change} name='start'/>
      <Header>to</Header>
      <input type="time" onChange={props.change} name='end'/>
    </div>
  </SignupContent>
)

const Submit = (props) => {
  if (props.info.submitted) {
    return <Redirect to={{ pathname: '/signedup' }} />
  }
  return (
    <SignupContent>
      <div>
        <div>email: {props.info.email}</div>
        <div>range: {props.info.range}</div>
        <div>latitude: {props.info.latitude}</div>
        <div>longitude: {props.info.longitude}</div>
        <div>budget: {props.info.budget}</div>
        <Button primary click={props.consume}>Create Account</Button>
      </div>
      <div></div>
    </SignupContent>
  )
}
