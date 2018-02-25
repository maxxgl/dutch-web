import React, { Component } from 'react'
import '../css/Person.css'
import ReactSwipe from 'react-swipe'
import circle from '../static/circle.svg'
import circleGreen from '../static/circle_green.svg'
import cancel from '../static/cancel_icon_white.svg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { pos: 0 }
  }

  handleCancel = () => this.props.cancel(this.props.prospect)
  
  slide = (i) => {
    this.swipe.slide(i)
    this.updatePos()
  }
  updatePos = () => this.setState({ pos: this.swipe.getPos() })

  render() {
    const pics = this.props.pics.map((pic, i) => (
        <img className='home-img' src={pic} key={i} alt='person' />
      ))
    return (
      <div className={'circle-column'}>
        <ReactSwipe ref={reactSwipe => this.swipe = reactSwipe}
          swipeOptions={{ callback: this.updatePos }}>
          {pics}
        </ReactSwipe>
        <Circles pageCount={this.props.pics.length} page={this.state.pos}
          base={'/home/' + this.props.prospect + '/'} slide={this.slide} />
        <div className={'cancel-wrapper'}>
          <img className='cancel' src={cancel} onClick={this.handleCancel}
            id={this.props.pic} alt='cancel' />
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
