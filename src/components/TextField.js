import React, { Component } from 'react'
import '../css/TextField.css'

export default class TextField extends Component {
  render() {
    const classes = 'mui-textfield ' + this.props.className
    return (
      <div className={classes}>
        <input
          type={this.props.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          name={this.props.name}
          onChange={this.props.onChange}
          onKeyPress={this.props.handleKeyPress}
          autoFocus={this.props.autoFocus}
        />
      </div>
    )
  }
}