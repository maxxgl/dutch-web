import React, { Component } from 'react'
import '../css/Login.css'
import Fullpage from '../components/Fullpage'
import Header from '../components/Header'
import { consumer } from '../utils/consumer'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: ''}
  }

  onGet = (name, value) => this.setState({[name]: value})

  consume = () => {
    consumer('', 'POST', this.state)
      .then((response) => {
        if (response) {
          console.log(response)
        }})
  }

  render() {
    return (
      <Fullpage>
        <div>
          <Header>Login</Header>
        </div>
      </Fullpage>
    )
  }
}
