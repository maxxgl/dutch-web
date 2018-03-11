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
    const i = this.state.remove.indexOf(id)
    if (i !== -1) {
      ids.splice(i, 1)
    } else {
      while (ids.length > 1) ids.shift()
      ids.push(id)
    }
    this.setState({ remove: ids })
    window.location.hash = '#/home'
  }

  day = new Date().toLocaleString('en-us', {  weekday: 'long' })
  tiles = () => (
    <main>
      <div id='day-text'>Matches for {this.day}</div>
      {this.state.prospects.map((p, i) => (
        <Tile key={i} pic={p.pics[0]} index={i}
          remove={this.state.remove.filter(id => id === p.match.$oid)} />
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
    const p = this.state.prospects[i]
    return <Person {...p} cancel={this.onCancel}
      removed={this.state.remove.filter(id => id === p.match.$oid)} />
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
    <img className={'home-img' + (props.remove.length ? ' remove' : '')}
      src={props.pic} alt='girl' />
  </Link>
)
