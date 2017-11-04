import React, { Component } from 'react'
import '../css/Grid.css'

export class Grid extends Component {
  render() {
    const classes = 'g ' + this.props.className
    return (
      <div className={classes}>{this.props.children}</div>
    )
  }
}

export class Column extends Component {
  render() {
    return (
      <div
        className={this.props.size}
        onClick={this.props.onClick}
        id={this.props.id}
        name={this.props.name}
      >
        {this.props.children}
      </div>
    )
  }
}
