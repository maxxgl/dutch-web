import React, { Component } from 'react'
import '../css/TextField.css'

export default class TextField extends Component {
  render() {
    classes = "mui-textfield" + {this.props.className}
    return (
      <div className={classes}>
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}