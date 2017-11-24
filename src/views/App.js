import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Start from './Start'
import Profile from './Profile'
import Dates from './Dates'
import Signup from './Signup'
import Signedup from './SignedUp'
import Login from './Login'

export default class App extends Component {
  redirecter = () => (<Redirect to="/" />)

  render() {
    if (!localStorage.getItem('token')) {
      return (
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/signedup" component={Signedup} />
          <Route path="/" component={this.redirecter} />
        </Switch>
      )
    }
    return (
      <Switch>
        <Route exact path="/" component={() => (<Redirect to ="/home" />)} />
        <Route path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/dates" component={Dates} />
        <Route path="/" component={this.redirecter} />
      </Switch>
    )
  }
}
