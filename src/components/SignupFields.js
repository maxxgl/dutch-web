import React from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Column } from '../components/Grid'
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import request from 'superagent';
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'
import TextField from '../components/TextField'
import Header from '../components/Header'
import camera from '../static/camera_icon.svg'
import findLocation from '../static/findlocation_icon.svg'
import female from '../static/woman_icon.svg'
import male from '../static/man_icon.svg'
import trans from '../static/trans_icon.svg'
import Button from '../components/Button'

export const Circles = (props) => {
  let circles = []
  for (let i = 0; i < props.pageCount; i++) {
    let circleType = i === props.page ? circleGreen : circle
    circles.push(
      <img key={i} alt='circle' className='circle' src={circleType}
        onClick={() => i <= props.valid ? props.slide(i) : null}/>
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

export const Email = (props) => (
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

export class Pictures extends React.Component {
  state = { pic: '', croppedPic: '' }

  crop = () => this.setState({ croppedPic: this.refs.cropper.getCroppedCanvas().toDataURL() })

  upload = () => {
    const url = 'https://api.cloudinary.com/v1_1/dutch-pictures/upload'
    let upload = request.post(url).field('upload_preset', 'sxeg1qhp')
                        .field('file', this.state.croppedPic)
    upload.end((err, response) => {
      if (err) {throw new Error(err)}
      if (response.body.secure_url !== '') {
        this.props.change(response.body.secure_url)
    }})
    this.setState({pic: '', croppedPic: ''})
  }

  render = () => (
     <SignupContent>
      <Header>Upload, take, or choose 10 pictures of yourself.</Header>
      <div>
        <Dropzone className="dropzone" accept="image/png,image/jpeg"
          onDrop={(files) => this.setState({ pic: files[0].preview})}>
          <img src={camera} alt='camera' />
        </Dropzone>
        {this.state.pic === '' ? null :
          <div>
            <Cropper ref='cropper'
              src={this.state.pic}
              aspectRatio={1 / 1}
              style={{width: '100%', height: '80vw'}}
              crop={this.crop} />
            <Button primary click={this.upload}>Add Pic</Button>
          </div>}
        <div className='upload-pics-wrapper' >{this.props.pics.map((item, i) => (
          <img key={i} src={item} alt='upload' className='upload-pic'/>
        ))}</div>
      </div>
    </SignupContent>
  )
}

export const Location = (props) => (
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
      <img id='map' src={'https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=640x480&maptype=roadmap&markers=color:blue%7C' + props.latitude + ',' + props.longitude} alt='map'/>
      <div className='range-wrapper'>
        <span className='label'>0</span>
        <input type='range' onChange={props.change} name='range'
          value={props.range} min='0' max='80' />
        <span className='label'>50</span>
        <Header>{Math.floor(props.range / 1.6)} mi</Header>
      </div>
    </div>
  </SignupContent>
)

export const Traits = (props) => {
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

export const Money = (props) => (
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

export const Gender = (props) => (
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

export const GenderButtons = (props) => (
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

export const Age = (props) => (
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

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const Schedule = (props) => (
  <SignupContent>
    <div>
      <Header>What times are you available?</Header>
      <div>You can adjust this later.</div>
    </div>
    <div id='schedule'>
      <div>8-10am</div><div>11-2pm</div><div>2-5pm</div><div>6-9pm</div>
      {props.schedule.map((d, i) =>
        d.map((e, j) => (
          <div key={i + '-' + j} name={i} j={j}
            onClick={() => props.change(i, j)}
            className= {'sched-entry' + (e ? ' selected' : '')}>
            {days[i]}
          </div>
        )))
      }
    </div>
  </SignupContent>
)

export const Submit = (props) => {
  if (props.info.submitted) {
    return <Redirect to={{ pathname: '/signedup' }} />
  }
  return (
    <SignupContent>
      <div>
        <div>email: {props.info.email}</div>
        <div>range: {Math.floor(props.info.range / 1.6)}</div>
        <div>latitude: {props.info.latitude}</div>
        <div>longitude: {props.info.longitude}</div>
        <div>budget: {props.info.budget}</div>
        <Button primary click={props.consume}>Create Account</Button>
      </div>
      <div></div>
    </SignupContent>
  )
}