import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Home.css'
import { consumer } from '../utils/consumer'
import Fullpage from '../components/Fullpage'
import Person from '../components/Person'
import Head from '../components/Head'
import more from '../static/reschedule_icon.svg'
import girl from '../static/girl.jpg'
import snow from '../static/snow-girl.jpg'
import SZA from '../static/SZA.jpg'
import sha from '../static/shakira.jpg'
import meg from '../static/meg.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    const girlObj = [girl, girl, snow, SZA, sha, meg]
    const snowObj = [snow, girl, snow, SZA, sha, meg]
    const SZAObj = [SZA, girl, snow, SZA, sha, meg]
    const shaObj = [sha, girl, snow, SZA, sha, meg]
    const megObj = [meg, girl, snow, SZA, sha, meg]
    this.state = { prospects: [ girlObj, snowObj, SZAObj, shaObj, megObj ],
                   remove: [0, 0, 0, 0, 0] }
    this.consume()
  }

  consume = () => {
    consumer('user/' + localStorage.getItem('userId') + '/match/', 'GET', "")
      .then((response) => {
        if (response) {
          // this.setState({ prospects: response })
        }})
  }

  shuffle = () => {
    let ids = []
    for (var i = 0; i < 5; i++) {
      if (this.state.remove[i]) ids.push(this.state.prospects[i].match)
    }
    consumer('user/' + localStorage.getItem('userId') + '/match/', 'DELETE', ids)
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
        <Tile key={index} pic={prospect[0]} index={index}
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
    if (!(i >= 0 && i < 5) || !(j >= 0 && j < this.state.prospects[i].length)) {
      return <Redirect to='/home' />
    }
    return <Person pics={this.state.prospects[i]} prospect={i} pic={j}
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
