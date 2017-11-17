import React, { Component } from 'react'
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

class Home extends Component {
  constructor(props) {
    super(props)
    this.consume()
  }

  consume = () => {
    consumer('user/' + localStorage.getItem('userId') + '/match/', 'GET', "")
      .then((response) => {
        if (response) {
        }})
  }

  render() {
    return (
      <Fullpage>
        <Head />
        <div id='flavor-wrapper'>
          <div id='home-flavor-text'>Matches for Friday</div>
        </div>
        <img className='home-img' src={girl} alt='girl' />
        <img className='home-img' src={snowGirl} alt='girl' />
        <img className='home-img' src={SZA} alt='girl' />
        <img className='home-img' src={shakira} alt='girl' />
        <img className='home-img' src={meg} alt='girl' />
        <div className='home-img' id='refresh-button'>
          <img id='refresh' src={more} alt='girl' />
        </div>
      </Fullpage>
    )
  }
}

export default Home
