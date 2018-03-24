import React, { Component } from 'react'
import '../css/Signup.css'
import Fullpage from '../components/Fullpage'
import { Grid, Column } from '../components/Grid'
import ReactSwipe from 'react-swipe'
import logo from '../static/logotype_green.svg'
import next from '../static/next_icon.svg'
import nonext from '../static/nonext_icon.svg'
import { consumer } from '../utils/consumer'
import { Email, Pictures, Location, Traits, Money, Gender, Age, Schedule,
  Circles, Submit } from '../components/SignupFields'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { pos: 0, firstName: '', lastName: '', email: '',  age: 0,
      password: '', pictures: [], range: 40, latitude: '', longitude: '',
      likes: [], dislikes: [], budget: 0, gender: '', seeking: '', youngest: 0,
      oldest: 0, submitted: 0, schedule: [[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false],[false, false, false, false]],}
  }

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
  setTime = (i, j) => {
    let sched = this.state.schedule
    sched[i][j] = !this.state.schedule[i][j]
    this.setState({schedule: sched})
  }

  consume = () => {
    consumer('user/', 'POST', this.state)
      .then((response) => {
        if (response) {
          this.setState({submitted: 1})
        }})
  }   

  render() {
    const pages = [
      <Email change={this.onChange} email={this.state.email}
        password={this.state.password} />,
      <Pictures change={this.setPictures} pics={this.state.pictures} />,
      <Location change={this.onChange} range={this.state.range}
        setLocation={this.setLocation} latitude={this.state.latitude}
        longitude={this.state.longitude} />,
      <Traits traits={this.state.likes} newTrait={this.newTrait} />,
      <Traits traits={this.state.dislikes} newTrait={this.newTrait} dislike />,
      <Money change={this.onChange} />,
      <Gender setGender={this.setGender} setSeeking={this.setSeeking}
        gender={this.state.gender} seeking={this.state.seeking} />,
      <Age change={this.onChange} />,
      <Schedule change={this.setTime} schedule={this.state.schedule} />,
      <Submit info={this.state} consume={this.consume} />
    ]

    let valid = new Array(pages.length).fill()
    valid.forEach((val, i) => valid[i] = {})

    valid[0].email = this.state.email !== ""
    valid[0].password = this.state.password.length > 4

    valid[1].pictures = this.state.pictures.length > 0

    const validPos = validatePos(valid)
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
                slide={this.slide} valid={validPos}
              />
            </nav>
          </Column>
          <Column size='u-md-1-4' />
        </Grid>
        <ReactSwipe ref={reactSwipe => this.swipe = reactSwipe}
          swipeOptions={{ callback: this.updatePos, continuous: false,
            disableScroll: true }}>
          {pages.map((item, i) => <div key={i}>
            {React.cloneElement(item, {id: i })}
          </div>)}
        </ReactSwipe>
        <div className='signup-next'>
          {this.state.pos < validPos ? <img src={next} alt='next' id='next'
            onClick={() => this.slide(this.state.pos + 1)} /> :
            <img src={nonext} alt='next' id='next'/>}
        </div>
      </Fullpage>
    )
  }
}

const validatePos = (valid) => {
  for (var i = 0; i < valid.length; i++) {
    for (let k in valid[i]){
      if (valid[i][k] !== true) {
        return i
      }
    }
  }
  return 0
}
