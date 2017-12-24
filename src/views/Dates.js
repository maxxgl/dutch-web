import React, { Component } from 'react'
// import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Dates.css'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import { consumer } from '../utils/consumer'

export default class Dates extends Component {
  constructor(props) {
    super(props)
    this.state = { dates: [
        {time: 1514092768},
        {time: 1514095768},
        {time: 1514099768}
      ] }
    // this.consume()
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
  <div className='date'>{props.date.time}</div>
)