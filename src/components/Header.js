import React, { Component } from 'react'
import '../css/Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        {this.props.children}
      </div>
    )
  }
}