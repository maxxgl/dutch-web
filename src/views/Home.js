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
    this.state = { prospects: [], remove: [] }
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
    const ids = this.state.remove
    const method = ids.length === 2 ? 'POST' : 'PUT'
    consumer('user/' + this.userId + '/match/', method, { ids: ids })
      .then((response) => {
        if (response) {
          this.setState({ remove: [] })
          this.consume()
        }})
  }

  onCancel = (id) => {
    let ids = this.state.remove
    while (ids.length > 1) ids.shift()
    ids.push(id)
    this.setState({ remove: ids })
    window.location.hash = '#/home'
  }

  day = new Date().toLocaleString('en-us', {  weekday: 'long' })
  tiles = () => (
    <main>
      <div id='flavor-wrapper'>
          <div id='home-flavor-text'>Matches for {this.day}</div>
      </div>
      {this.state.prospects.map((prospect, index) => (
        <Tile key={index} pic={prospect.pics[0]} index={index}
          remove={this.state.remove[index]} />
      ))}
      <div className={'home-tile back' + this.state.remove.length}
        id='refresh-button'>
        <img id='refresh' onClick={this.shuffle} alt='refresh'
          src={this.state.remove.length === 2 ? confirm : more}/>
      </div>
    </main>
  )

  prospect = (props) => {
    const i = parseInt(props.match.params.number, 10)
    if (i < 0 || i >= this.state.prospects.length) {
      return <Redirect to='/home' />
    }
    return <Person {...this.state.prospects[i]} cancel={this.onCancel} />
  }

  render = () => (
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

const Tile = (props) => (
  <Link to={'/home/' + props.index} className='home-tile' >
    <img className={'home-img' + (props.remove ? ' remove' : '')}
      src={props.pic} alt='girl' />
  </Link>
)
