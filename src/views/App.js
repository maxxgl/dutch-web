import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Start from './Start'
import Signup from './Signup'

class App extends Component {
  loggedIn() {
    return false
  }

  render(){
    return (
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    )
  }
}

export default App
