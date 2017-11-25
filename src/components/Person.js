import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'

export default class Home extends Component {
  prospect = () => this.props.pics.map((prospect, index) => (
        <img className='home-img' key={index} src={prospect} alt='person' />
      ))

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/home/:number' component={this.prospect} />
        </Switch>
        <Circles pageCount={this.props.pics.length}/>
      </div>
    )
  }
}

const Circles = (props) => {
  let circles = []
  for (var i = 0; i < props.pageCount; i++) {
    let circleType = i === props.page ? circleGreen : circle
    circles.push(
      <img
        key={i}
        src={circleType}
        alt='circle'
        className='circle'
      />
    )
  }
  return circles
}
