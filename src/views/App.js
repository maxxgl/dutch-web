import React, { Component } from 'react'
import Home from './Home'
import Start from './Start'

class App extends Component {
  loggedIn() {
    return false
  }

  render(){
    if (this.loggedIn()) {
      return <Home />
    }
    return <Start />
  }
}

export default App
