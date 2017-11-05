import React, { Component } from 'react'
import Fullpage from '../components/Fullpage'
import HomeHeader from '../components/HomeHeader'

export default class Profile extends Component {
  render() {
    return (
      <Fullpage>
        <HomeHeader />
      </Fullpage>
    )
  }
}
