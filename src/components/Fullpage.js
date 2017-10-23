import React, { Component } from 'react'

class Fullpage extends Component {
  render() {
    return (
      <div style={{
          backgroundColor: this.props.background,
          color: this.props.color,
          textAlign: this.props.textAlign,
          height: '100%'
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Fullpage
