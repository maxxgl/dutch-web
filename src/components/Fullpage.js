import React, { Component } from 'react'

class Fullpage extends Component {
  render() {
    return (
      <div style={{
          color: this.props.color,
          textAlign: this.props.textAlign,
          height: '100%'
        }}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Fullpage
