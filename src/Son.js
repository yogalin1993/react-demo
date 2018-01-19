import React, { Component } from 'react'

class Son extends Component {
  render() {
    return (
      <div>
        {this.props.text}
        <button onClick={this.props.updateBox}>更新父组件</button>
      </div>
    )
  }
}

export default Son
