import React, { Component } from 'react'
import Home from './Home'
import Login from './Login'

class App extends Component {
  loggedIn() {
    return false
  }

  render(){
    if (this.loggedIn()) {
      return <Home />
    }
    return <Login />
  }
}

export default App
