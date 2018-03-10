import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Home.css'
import { consumer } from '../utils/consumer'
import Fullpage from '../components/Fullpage'
import Person from '../components/Person'
import Head from '../components/Head'
import more from '../static/reschedule_icon.svg'
import confirm from '../static/confirm_icon.svg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { prospects: [], remove: [0, 0, 0, 0, 0] }
    this.consume()
  }
  userId = localStorage.getItem('userId')

  consume = () => {
    consumer('user/' + this.userId + '/match/', 'GET', "")
      .then((response) => {
        if (response) {
          this.setState({ prospects: response })
        }})
  }

  shuffle = () => {
    let ids = []
    let method = 'PUT'
    for (var i = 0; i < 5; i++) {
      if (this.state.remove[i]) ids.push(this.state.prospects[i].match.$oid)
    }
    if (ids.length === 2) {
      method = 'POST'
    }
    consumer('user/' + this.userId + '/match/', method, { ids: ids })
      .then((response) => {
        if (response) {
          this.setState({ remove: [0, 0, 0, 0, 0] })
          this.consume()
        }})
  }

  onCancel = (i) => {
    let newRemove = this.state.remove
    newRemove[i] = 1
    this.setState({ remove: newRemove })
    window.location.hash = '#/home'
  }

  day = new Date().toLocaleString('en-us', {  weekday: 'long' })
  tiles = () => {
    let len = 0
    let icon = more
    this.state.remove.map(value => len += value)
    if (len === 2) {
      icon = confirm
    }
    return (
      <div>
        <div id='flavor-wrapper'>
            <div id='home-flavor-text'>Matches for {this.day}</div>
        </div>
        {this.state.prospects.map((prospect, index) => (
          <Tile key={index} pic={prospect.pics[0]} index={index}
            remove={this.state.remove[index]} />
        ))}
        <div className={'home-tile back' + len}  id='refresh-button'>
          <img id='refresh' src={icon} onClick={this.shuffle} alt='refresh' />
        </div>
      </div>
    )
  }

  prospect = (props) => {
    const i = parseInt(props.match.params.number, 10)
    if (i < 0 || i >= this.state.prospects) {
      return <Redirect to='/home' />
    }
    return <Person pics={this.state.prospects[i].pics} prospect={i}
      cancel={this.onCancel} />
  }

  render() {
    return (
      <Fullpage>
        <Head />
        <Switch>
          <Route exact path='/home' component={this.tiles}/>
          <Route exact path='/home/:number' component={this.prospect} />
          <Route path="/" component={() => <Redirect to="/home" />} />
        </Switch>
      </Fullpage>
    )
  }
}

const Tile = (props) => (
  <Link to={'/home/' + props.index} className='home-tile' >
    <img className={'home-img' + (props.remove ? ' remove' : '')}
      src={props.pic} alt='girl' />
  </Link>
)
