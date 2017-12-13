import React, { Component } from 'react'
// import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Dates.css'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import { consumer } from '../utils/consumer'

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
      <Fullpage>
        <Head />
        {this.state.dates}
      </Fullpage>
    )
  }
}
