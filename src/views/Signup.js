import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import Dropzone from 'react-dropzone';
import request from 'superagent';
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
import { Redirect } from 'react-router-dom'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 0, firstName: '', lastName: '', email: '',  age: 0,
      password: '', pictures: [], range: 25, latitude: '', longitude: '',
      likes: [], dislikes: [], budget: 0, gender: '', seeking: '', youngest: 0,
      oldest: 0, submitted: 0, schedule: '', start: '', end: '' }
    this.pages()
  }

  handlePageChange = (e) => this.setState({ page: parseInt(e.target.id, 10) })

  nextPage = () => this.setState({ page: this.state.page + 1 })
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
  setPictures = (pics) => this.setState({pictures: pics})

  consume = () => {
    consumer('user/', 'POST', this.state)
      .then((response) => {
        if (response) {
          this.setState({submitted: 1})
        }})
  }

  pages = (props) => {
    return [
      <Email key={1} change={this.onChange} pager={this.nextPage} 
        email={this.state.email} password={this.state.password} />,
      <Pictures key={2} change={this.setPictures} pager={this.nextPage}
        pics={this.state.pictures} />,
      <Location key={3} change={this.onChange} pager={this.nextPage} 
        range={this.state.range} setLocation={this.setLocation}
        latitude={this.state.latitude} longitude={this.state.longitude} />,
      <Traits key={4} change={this.onChange} traits={this.state.likes}
        newTrait={this.newTrait} pager={this.nextPage} />,
      <Traits key={5} change={this.onChange} traits={this.state.dislikes}
        newTrait={this.newTrait} pager={this.nextPage} dislike />,
      <Money key={6} change={this.onChange} pager={this.nextPage} />,
      <Gender key={7} change={this.onChange} setGender={this.setGender}
        setSeeking={this.setSeeking} gender={this.state.gender}
        seeking={this.state.seeking} pager={this.nextPage} />,
      <Age key={8} change={this.onChange} pager={this.nextPage} />,
      <Schedule key={9} change={this.onChange} pager={this.nextPage} 
        start={this.state.start} end={this.state.end} />,
      <Submit key={10} info={this.state} consume={this.consume} />
    ]
  }

  render() {
    return (
      <Fullpage>
        <Grid>
          <Column size='u-md-1-4'>
            <img src={logo} alt='logo' className='signup-logo'/>
          </Column>
          <Column size='u-1-1 u-md-1-2 circle-column'>
            <nav>
              <Circles
                page={this.state.page}
                pageCount={this.pages().length}
                change={this.handlePageChange}
              />
            </nav>
          </Column>
          <Column size='u-md-1-4' />
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

const SignupContent = (props) => (
  <Grid className='signup-content'>
    <Column size='u-2-24' />
    <Column size='u-8-24'>
      {props.children[0]}
    </Column>
    <Column size='u-2-24' />
    <Column size='u-9-24'>
      {props.children[1]}
    </Column>
    <Column size='u-3-24'>
      <img src={next} onClick={props.pager} alt='next'
        className='icon-centered'/>
    </Column>
  </Grid>
)

const Email = (props) => (
  <SignupContent pager={props.pager}>
    <div>
      <TextField type='email' value={props.email} onChange={props.change}
        placeholder='Email' name='email' />
      <TextField type='password' value={props.password} onChange={props.change}
        placeholder='Password' name='password' />
    </div>
    <div>
      <Header>What is your email address?</Header>
      <div>This will also be your username.</div>
    </div>
  </SignupContent>
)

const Pictures = (props) => (
  <SignupContent pager={props.pager}>
    <div>
      <Dropzone
        multiple={false}
        accept="image/png,image/jpeg"
        onDrop={(files) => upload(files[0], props.pics, props.change)}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
      <div className='upload-pics-wrapper' >{props.pics.map((item, i) => (
        <img key={i} src={item} alt='upload' className='upload-pic'/>
      ))}</div>
    </div>
    <div>
      <Header>Upload 10 pictures of yourself.</Header>
    </div>
  </SignupContent>
)

const upload = (file, pics, change) => {
  const preset = 'sxeg1qhp'
  const url = 'https://api.cloudinary.com/v1_1/dutch-pictures/upload'
  let img = new Image()
  img.src = window.URL.createObjectURL( file );
  img.onload = () => {
    if (img.naturalHeight !== img.naturalWidth) {
      alert("Image must be square")
      return
    }
    let upload = request.post(url)
                        .field('upload_preset', preset)
                        .field('file', file)
    upload.end((err, response) => {
      if (err) {
        throw new Error(err)
      }
      if (response.body.secure_url !== '') {
        change(pics.concat(response.body.secure_url))
      }
    })
  }
}

const Location = (props) => (
  <SignupContent pager={props.pager}>
    <div>
      <div>{props.range} km</div>
      <span>1</span>
      <input type='range' onChange={props.change} name='range'
        value={props.range} min='1' max='50' />
      <span>50</span>
    </div>
    <div>
      <Header>
        What is your location, and how far will you travel for a date
      </Header>
      <div onClick={props.setLocation}>
        <img src={findLocation} alt='location' className='location'/>
        <span>Find My Location</span>
      </div>
      <div>Latitude: {props.latitude}°</div>
      <div>Longitude: {props.longitude}°</div>
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
    <SignupContent pager={props.pager}>
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
      <div>
        <Header>{traitText}</Header>
        <div>Use single words.</div>
      </div>
    </SignupContent>
  )
}

const Money = (props) => (
  <SignupContent pager={props.pager}>
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
  <SignupContent pager={props.pager}>
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
  <SignupContent pager={props.pager}>
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

const Schedule = (props) => (
  <SignupContent pager={props.pager}>
    <div>
      <input type="time" onChange={props.change} name='start'/>
      <Header>to</Header>
      <input type="time" onChange={props.change} name='end'/>
    </div>
    <div>
      <Header>What time are you available each day for dates?</Header>
      <div>You can adjust this later.</div>
    </div>
  </SignupContent>
)

const Submit = (props) => {
  if (props.info.submitted) {
    return <Redirect to={{ pathname: '/signedup' }} />
  }
  return (
    <SignupContent>
      <div>{Object.keys(props.info).map((item, i) => (
          <div key={i}>
            {item}: {props.info[item]}
          </div>
      ))}</div>
      <Button primary click={props.consume}>Create Account</Button>
    </SignupContent>
  )
}
