import React, { Component } from 'react'
import '../css/Profile.css'
import Fullpage from '../components/Fullpage'
import Head from '../components/Head'
import Header from '../components/Header'
import girl from '../static/girl.jpg'
import { consumer } from '../utils/consumer'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { firstName: '', lastName: '', range: '25', zip: '',likes: [],
      budget: 0, gender: '', seeking: '', age: 0, youngest: 0, oldest: 0 }
      this.consume()
  }

  onGet = (name, value) => this.setState({[name]: value})

  consume = () => {
    consumer('user/5a071e94a6224b0e7529241c', 'GET', "")
      .then((response) => {
        if (response) {
          for (const key in response) {
            this.onGet(key, response[key])
          }
        }})
  }

  render() {
    return (
      <Fullpage>
        <Head />
        <div>
          <img className='home-img' src={girl} alt='girl' />
          <Header>{this.state.firstName} {this.state.lastName}</Header>
          <div>Within {this.state.range} miles of {this.state.zip}</div>
          <div>{this.state.likes}</div>
          <Header>{this.state.budget}</Header>
          <Header>{this.state.gender}</Header>
          <Header>{this.state.seeking}</Header>
          <Header>{this.state.age}</Header>
          <Header>{this.state.youngest}, {this.state.oldest}</Header>
        </div>
      </Fullpage>
    )
  }
}
