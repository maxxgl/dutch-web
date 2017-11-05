import React, { Component } from 'react'
import '../css/Home.css'
import Fullpage from '../components/Fullpage'
import HomeHeader from '../components/HomeHeader'
// import { Grid, Column } from '../components/Grid'

class Home extends Component {
  render() {
    return (
      <Fullpage>
        <HomeHeader />
      </Fullpage>
    )
  }
}

export default Home
