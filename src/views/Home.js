import React, { Component } from 'react'
import '../css/Home.css'
import Fullpage from '../components/Fullpage'
import HomeHeader from '../components/HomeHeader'
import { Grid, Column } from '../components/Grid'
import girl from '../static/girl.jpg'
import Header from '../components/Header'

class Home extends Component {
  render() {
    return (
      <Fullpage textAlign='center'>
        <HomeHeader />
        <Grid>
          <Column size='u-1-1 u-md-1-4' id='home-flavor-text'>
            <Header className=''>Matches for Friday</Header>
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
