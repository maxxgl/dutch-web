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
    consumer('user/' + localStorage.getItem('userId'), 'GET', "")
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
          <div>
            I am a {this.state.age} year old {this.state.gender} seeking 
            a {this.state.seeking}
          </div>
          <div>
            between {this.state.youngest} and {this.state.oldest} years old
          </div>
          <div>Within {this.state.range} miles of {this.state.zip}</div>
          <div>I like{this.state.likes}</div>
          <div>I'm willing to spend ${this.state.budget} on a date.</div>
        </div>
      </Fullpage>
    )
  }
}
