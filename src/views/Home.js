import React, { Component } from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'
import Fullpage from '../components/Fullpage'
import logo from '../static/logotype_white.svg'
import { Grid, Column } from '../components/Grid'
import girl from '../static/girl.jpg'
import date from '../static/date_icon.svg'
// import Header from '../components/Header'
// import Button from '../components/Button'

class Home extends Component {
  render() {
    return (
      <Fullpage>
        <Grid className='header'>
          <Column size='u-1-4'>
            <Link to={{ pathname: '/profile' }}>
              <img src={girl} alt='logo' className='header-img' id='profile'/>              
            </Link>
          </Column>
          <Column size='u-1-2'>
            <Link to={{ pathname: '/home' }}>
              <img src={logo} alt='logo' className='header-img' id='logo' />
            </Link>
          </Column>
          <Column size='u-1-4'>
            <Link to={{ pathname: '/dates' }}>
              <img src={date} alt='logo' className='header-img' id='date'/>
            </Link>
          </Column>
        </Grid>
      </Fullpage>
    )
  }
}

export default Home
