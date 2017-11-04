import React, { Component } from 'react'
import '../css/Button.css'

class Button extends Component {
  primary() {
    if (this.props.primary) {
      return 'button-primary'
    }
  }

  width() {
    if (this.props.fill) {
      return '100%'
    } 
  }

  render() {
    return (
      <button
        className={this.primary()}
        style={{ width: this.width() }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}

export default Button
