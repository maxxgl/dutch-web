import React, { Component } from 'react'

class Fullpage extends Component {
  render() {
    return (
      <div style={{
          color: this.props.color,
          backgroundColor: this.props.backgroundColor,
          textAlign: this.props.textAlign,
          minHeight: '100%'
        }}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Fullpage
