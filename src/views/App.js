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
        <Route path="/" component={Start}>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Route>
      </Switch>
    )
  }
}

export default App
