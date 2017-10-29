import React, { Component } from 'react'
import Fullpage from '../components/Fullpage'
import Button from '../components/Button'
import { Column } from '../components/Grid'

class Login extends Component {
  render() {
    return (
      <Fullpage background='#61c5c1' color='white' textAlign='center'>
         <Button>Email</Button>
      </Fullpage>
    )
  }
}

export default Login
