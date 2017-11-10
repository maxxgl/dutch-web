import React, { Component } from 'react'
import '../css/Home.css'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import { Grid, Column } from '../components/Grid'
import girl from '../static/girl.jpg'
import snowGirl from '../static/snow-girl.jpg'

class Home extends Component {
  render() {
    return (
      <Fullpage>
        <Head />
        <Grid>
          <Column size='u-1-1 u-md-1-4' id='home-flavor-text'>
            <div>Matches for Friday</div>
          </Column>
          <Column size='u-1-2 u-md-1-4'>
            <img src={girl} alt='girl' />
          </Column>
          <Column size='u-1-2 u-md-1-4'>
            <img src={snowGirl} alt='girl' />
          </Column>
          <Column size='u-1-2 u-md-1-4'>
            <img src={girl} alt='girl' />
          </Column>
          <Column size='u-1-2 u-md-1-4'>
            <img src={girl} alt='girl' />
          </Column>
          <Column size='u-1-2 u-md-1-4'>
            <img src={girl} alt='girl' />
          </Column>
          <Column size='u-1-2 u-md-1-4'>
            <img src={girl} alt='girl' />
          </Column>

        </Grid>
      </Fullpage>
    )
  }
}

export default Home
