import React, { Component } from 'react'
import '../css/Head.css'
import { Link } from 'react-router-dom'
import logo from '../static/logotype_white.svg'
import { Grid, Column } from '../components/Grid'
import date from '../static/date_icon.svg'

export default class Head extends Component {
  render() {
    return (
      <Grid className='head'>
        <Column size='u-1-4'>
          <Link to={{ pathname: '/profile' }}>
            <img src={localStorage.getItem('profilePic')}
            alt='profile' className='head-img' id='profile'/>
          </Link>
        </Column>
        <Column size='u-1-2'>
          <Link to={{ pathname: '/home' }}>
            <img src={logo} alt='logo' className='head-img' id='logo' />
          </Link>
        </Column>
        <Column size='u-1-4'>
          <Link to={{ pathname: '/dates' }}>
            <img src={date} alt='dates' className='head-img' id='date'/>
          </Link>
        </Column>
        </Grid>
    )
  }
}
