import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Person.css'
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'
import cancel from '../static/cancel_icon_white.svg'

export default class Home extends Component {
  render() {
    return (
      <div className={'circle-column'}>
        <img className='home-img' src={this.props.pics[this.props.pic]} alt='person' />
        <Circles pageCount={this.props.pics.length} page={this.props.pic}
          base={'/home/' + this.props.prospect + '/'} />
        <div className={'cancel-wrapper'}>
          <img className='cancel' src={cancel} alt='canel' />
        </div>
      </div>
    )
  }
}

const Circles = (props) => {
  let circles = []
  for (var i = 0; i < props.pageCount; i++) {
    let circleType = i === props.page ? circleGreen : circle
    circles.push(
      <Link to={props.base + i} key={i}>
        <img src={circleType} alt='circle' className='circle' />
      </Link>
    )
  }
  return circles
}
