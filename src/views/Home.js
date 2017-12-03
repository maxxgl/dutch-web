import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Home.css'
import { consumer } from '../utils/consumer'
import Fullpage from '../components/Fullpage'
import Person from '../components/Person'
import Head from '../components/Head'
import more from '../static/reschedule_icon.svg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { prospects: [], remove: [0, 0, 0, 0, 0] }
    this.consume()
  }

  consume = () => {
    consumer('user/' + localStorage.getItem('userId') + '/match/', 'GET', "")
      .then((response) => {
        if (response) {
          this.setState({ prospects: response })
        }})
  }

  shuffle = () => {
    let ids = []
    for (var i = 0; i < 5; i++) {
      if (this.state.remove[i]) ids.push(this.state.prospects[i]._id)
    }
    consumer('user/' + localStorage.getItem('userId') + '/match/',
      'DELETE', { ids: ids })
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
  tiles = () => (
    <div>
      <div id='flavor-wrapper'>
          <div id='home-flavor-text'>Matches for {this.day}</div>
      </div>
      {this.state.prospects.map((prospect, index) => (
        <Tile key={index} pic={prospect.pics[0]} index={index}
          remove={this.state.remove[index]} />
      ))}
      <div className='home-tile' id='refresh-button'>
        <img id='refresh' src={more} onClick={this.shuffle} alt='refresh' />
      </div>
    </div>
  )

  prospect = (props) => {
    const i = parseInt(props.match.params.number, 10)
    const j = parseInt(props.match.params.pic, 10)
    const picLength = this.state.prospects[i].pics.length
    if (!(i >= 0 && i < 5) || !(j >= 0 && j < picLength)) {
      return <Redirect to='/home' />
    }
    return <Person pics={this.state.prospects[i].pics} prospect={i} pic={j}
      cancel={this.onCancel} />
  }

  render() {
    return (
      <Fullpage>
        <Head />
        <Switch>
          <Route exact path='/home' component={this.tiles}/>
          <Route exact path='/home/:number' component={(props) => (
            <Redirect to={'/home/' + props.match.params.number + '/0'} />)} />
          <Route exact path='/home/:number/:pic' component={this.prospect} />
        </Switch>
      </Fullpage>
    )
  }
}

const Tile = (props) => (
  <Link to={'/home/' + props.index + '/0'} className='home-tile' >
    <img className={'home-img' + (props.remove ? ' remove' : '')}
      src={props.pic} alt='girl' />
  </Link>
)
