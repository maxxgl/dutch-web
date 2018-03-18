import React, { Component } from 'react'
// import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Dates.css'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import { consumer } from '../utils/consumer'
import expand from '../static/expand_icon.svg'
import Button from '../components/Button'


export default class Dates extends Component {
  constructor(props) {
    super(props)
    this.state = { dates: [] }
    this.consume()
  }

  consume = () => {
    consumer('user/' + localStorage.getItem('userId') + '/date/', 'GET', "")
      .then((response) => {
        if (response) {
          this.setState({ dates: response })
        }})
  }

  render() {
    return (
      <Fullpage backgroundColor='#343534'>
        <Head />
        <div id='dim'>Upcoming Dates</div>
        {this.state.dates.map((date, index) => (
          <DateEntry key={index} {...date} />
        ))}
      </Fullpage>
    )
  }
}

const DateEntry = (props) => (
  <div className='date'>
    <div onClick={(e) => {
      let display = e.currentTarget.nextSibling.style.display
      let toggle = display === 'block' ? 'none' : 'block'
      e.currentTarget.nextSibling.style.display = toggle
    }}>
      {datetime(props.data.time)}
      <img src={expand} className='expand' alt='expand'/>
    </div>
    <div className='date-info'>
      <div>
        {props.pics.map((pic, index) => (
          <img key={index} src={pic} className='date-pics' alt='date option' />
        ))}
      </div>
      <div>Location: {props.data.location.name}</div>
      <div>Dutch: {props.data.dutch}</div>
      <div>Rating: {props.data.rating}</div>
      <div>User A Checked In: {props.data.userACheckedIn.toString()}</div>
      <div>User B Checked In: {props.data.userBCheckedIn.toString()}</div>
      <Button primary click={() => checkin(props._id.$oid)}>
        Check-In
      </Button>
    </div>
  </div>
)

const datetime = (t) => {
  const date = new Date(t)
  const options = { weekday: 'long', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric' }
  return date.toLocaleString('en-us', options)
}

const checkin = (id) => {
  navigator.geolocation.getCurrentPosition((p) => {
    const place = {
      latitude: p.coords.latitude,
      longitude: p.coords.longitude,
    }
    consumer('user/' + localStorage.getItem('userId') + '/date/' + 
      id, 'PUT', place)
    .then((response) => {window.location.reload()})
  })
}
