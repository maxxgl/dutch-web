import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import '../css/Home.css'
import { consumer } from '../utils/consumer'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import more from '../static/reschedule_icon.svg'
import girl from '../static/girl.jpg'
import snowGirl from '../static/snow-girl.jpg'
import SZA from '../static/SZA.jpg'
import shakira from '../static/shakira.jpg'
import meg from '../static/meg.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { prospects: [girl, snowGirl, SZA, shakira, meg] }
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
        <Tile key={index} pic={prospect} index={index} />
      ))}
      <div className='home-tile' id='refresh-button'>
        <img id='refresh' src={more} alt='refresh' />
      </div>
    </div>
  )

  prospect = (props) => {
    // const i = parseInt(props.match.params.number, 10)
    return this.state.prospects.map((prospect) => (
      <img className='prospect-img' key={prospect.toString()}
        src={prospect} alt='' />
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
