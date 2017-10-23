import React, { Component } from 'react'
import '../css/Grid.css'

export class Grid extends Component {
  render() {
    return (
      <div className='g'>{this.props.children}</div>
    )
  }
}

export class Column extends Component {
  render() {
    return (
      <div className={this.props.size}>{this.props.children}</div>
    )
  }
}
