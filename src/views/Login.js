import React, { Component } from 'react'
import '../css/Login.css'
import Fullpage from '../components/Fullpage'
import Header from '../components/Header'
import { consumer } from '../utils/consumer'
import TextField from '../components/TextField'
import Button from '../components/Button'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: ''}
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  consume = () => {
    consumer('', 'POST', this.state)
      .then((response) => {
        if (response) {
          localStorage.setItem('userId', response.userId)
          localStorage.setItem('token', response.token)
          this.setState({ email: '', password: '' })
          window.location.reload()
        }})
  }

  render() {
    return (
      <Fullpage className='login'>
        <Header>Login</Header>
        <TextField type='email' onChange={this.onChange} placeholder='Email'
          name='email' />
        <TextField type='password' onChange={this.onChange}
          placeholder='Password' name='password' />
        <Button primary click={this.consume}>Login</Button>
      </Fullpage>
    )
  }
}
