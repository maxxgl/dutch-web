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
    this.state = { email: '', password: '', message: '' }
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  consume = (e) => {
    e.preventDefault()
    consumer('', 'POST', this.state)
      .then((response) => {
        if (response) {
          localStorage.setItem('userId', response.userId)
          localStorage.setItem('token', response.token)
          localStorage.setItem('profilePic', response.pic)
          this.setState({ email: '', password: '' })
          window.location.reload()
        } else {
          this.setState({ message: "Invalid Credentials" })
        }
      })
  }

  render() {
    return (
      <Fullpage className='login'>
        <Header>Login</Header>
        <form>
          <TextField type='email' onChange={this.onChange} placeholder='Email'
            name='email' autoFocus={true} value={this.state.email} />
          <TextField type='password' onChange={this.onChange} name='password'
            placeholder='Password' value={this.state.password} />
          <Button primary click={this.consume}>Login</Button>
        </form>
        {this.state.message === '' ? null :
          <div id='login-msg'>{this.state.message}</div>}
      </Fullpage>
    )
  }
}
