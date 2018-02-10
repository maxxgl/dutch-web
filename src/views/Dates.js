import React, { Component } from 'react'
// import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Dates.css'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import { consumer } from '../utils/consumer'
import expand from '../static/expand_icon.svg'


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
          <Date key={index} date={date} />
        ))}
      </Fullpage>
    )
  }
}

const Date = (props) => (
  <div className='date' onClick={(e) => {
      let display = e.currentTarget.children[1].style.display
      let toggle = display === 'block' ? 'none' : 'block'
      e.currentTarget.children[1].style.display = toggle
    }}>
    {props.date.data.time}
    <img src={expand} className='expand' alt='expand'/>
    <div className='date-info'>
      <div>
        {props.date.pics.map((pic, index) => (
          <img key={index} src={pic} className='date-pics' alt='date option' />
        ))}
      </div>
      <div>Location: {props.date.data.location.name}</div>
      <div>Dutch: {props.date.data.dutch}</div>
      <div>Rating: {props.date.data.rating}</div>
    </div>
  </div>
)