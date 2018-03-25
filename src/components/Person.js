import React, { Component } from 'react'
import '../css/Person.css'
import { Link } from 'react-router-dom'
import ReactSwipe from 'react-swipe'
import circle from '../static/circle_white.svg'
import circleGreen from '../static/circle_green.svg'
import cancel from '../static/cancel_icon.svg'
import back from '../static/next_icon_white.svg'
import check from '../static/confirm_icon_green.svg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { pos: 0 }
  }

  handleCancel = () => this.props.cancel(this.props.match.$oid)

  slide = (i) => {
    this.swipe.slide(i)
    this.updatePos()
  }
  updatePos = () => this.setState({ pos: this.swipe.getPos() })

  pics = this.props.pics.map((pic, i) => (
    <img className='home-img' src={pic} key={i} alt='person' />
  ))

  render() {
    return (
      <div className={'circle-column'}>
        <ReactSwipe ref={reactSwipe => this.swipe = reactSwipe}
          swipeOptions={{ callback: this.updatePos }}>
          {this.pics}
        </ReactSwipe>
        <Circles pageCount={this.props.pics.length} page={this.state.pos}
          slide={this.slide} />
        <div>
          <Link to='/home'>
            <img className='back person-nav' src={back} alt='back' />
          </Link>
          <img className='person-nav' alt='cancel' onClick={this.handleCancel}
            src={this.props.removed.length ? check : cancel} />
        </div>
      </div>
    )
  }
}

const Circles = (props) => {
  let circles = []
  for (let i = 0; i < props.pageCount; i++) {
    let circleType = i === props.page ? circleGreen : circle
    circles.push(
      <img src={circleType} alt='circle' className='circle' key={i}
        onClick={() => props.slide(i)} />
    )
  }
  return circles
}
