import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Start from './Start'
import Login from './Login'

class App extends Component {
  loggedIn() {
    return false
  }

  render(){
    return (
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    )
  }
}

export default App
