import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Start from './Start'
import Profile from './Profile'
import Dates from './Dates'
import Signup from './Signup'
import Signedup from './SignedUp'
import Login from './Login'

class App extends Component {
  loggedIn() {
    return false
  }

  render() {
    if (window.location.hash !== "#/" && !localStorage.getItem('token')) {
      return window.location = "/"
    }
    return (
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/dates" component={Dates} />
        <Route path="/signup" component={Signup} />
        <Route path="/signedup" component={Signedup} />
      </Switch>
    )
  }
}

export default App
