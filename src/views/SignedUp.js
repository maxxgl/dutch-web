import React, { Component } from 'react'
import { Grid, Column } from '../components/Grid'
import logo from '../static/logotype_green.svg'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import next from '../static/next_icon_blue.svg'

export default class Signup extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Column size='u-1-4'>
            <img src={logo} alt='logo' className='signup-logo'/>
          </Column>
          <Column size='u-1-2' />
          <Column size='u-1-4' />
        </Grid>
        <Grid className='signup-content'>
          <Column size='u-2-24' />
          <Column size='u-8-24' id='submit-box' />
          <Column size='u-2-24' />
          <Column size='u-9-24'>
            <Header>That’s it! Get ready for some sweet dates.</Header>
            <div>If you need to change anything, you can do-so in your account settings.</div>
          </Column>
          <Column size='u-3-24'>
            <Link to={{ pathname: '/home' }}>
              <img src={next} alt='next' className='icon-centered'/>
            </Link>
          </Column>
        </Grid>
      </div>
    )
  }
}