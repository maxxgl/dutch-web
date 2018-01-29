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
      let x = e.target.children[1].style.display
      e.target.children[1].style.display = x === 'block' ? 'none' : 'block'
    }}>
    {props.date.time}
    <img src={expand} className='expand' alt='expand'/>
    <div className='date-info'>
      <div>
        {props.date.pics.map((pic, index) => (
          <img key={index} src={pic} className='date-pics' />
        ))}
      </div>
      <div>Location: {props.date.location}</div>
      <div>Dutch: {props.date.dutch}</div>
      <div>Rating: {props.date.rating}</div>
    </div>
  </div>
)