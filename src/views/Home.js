import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import '../css/Home.css'
import { consumer } from '../utils/consumer'
import Fullpage from '../components/Fullpage'
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
    const girlObj = [girl, girl, girl, girl, girl, girl, girl, girl]
    const snowObj = [snow, snow, snow, snow, snow, snow, snow, snow]
    const SZAObj = [SZA, SZA, SZA, SZA, SZA, SZA, SZA, SZA]
    const shaObj = [sha, sha, sha, sha, sha, sha, sha, sha]
    const megObj = [meg, meg, meg, meg, meg, meg, meg, meg]
    this.state = { prospects: [ girlObj, snowObj, SZAObj, shaObj, megObj ] }
    this.consume()
  }

  consume = () => {
    consumer('user/' + localStorage.getItem('userId') + '/match/', 'GET', "")
      .then((response) => {
        if (response) {
          this.setState({ prospects: response })
        }})
  }

  tiles = () => (
    <div>
      {this.state.prospects.map((prospect, index) => (
        <Tile key={index} pic={prospect[0]} index={index} />
      ))}
      <div className='home-tile' id='refresh-button'>
        <img id='refresh' src={more} alt='refresh' />
      </div>
    </div>
  )

  prospect = (props) => {
    const i = parseInt(props.match.params.number, 10)
    if (i < 0 || i > 4 || isNaN(i) ) return <Redirect to='/home' />
    return this.state.prospects[i].map((prospect, index) => (
      <img className='prospect-img' key={index} src={prospect} alt='person' />
    ))
  }

  render() {
    let day = new Date().toLocaleString('en-us', {  weekday: 'long' })

    return (
      <Fullpage>
        <Head />
        <div id='flavor-wrapper'>
          <div id='home-flavor-text'>Matches for {day}</div>
        </div>
        <Switch>
          <Route exact path='/home' component={this.tiles}/>
          <Route path='/home/:number' component={this.prospect} />
        </Switch>
      </Fullpage>
    )
  }
}

const Tile = (props) => (
  <Link to={'/home/' + props.index} className='home-tile' >
    <img className='home-img' src={props.pic} alt='girl' />
  </Link>
)
