import React, { Component } from 'react'

class App extends Component {
  submit(e) {
    e.preventDefault()
    console.log(this.textInput.value)
  }
  componentDidMount() {
    this.textInput.focus()
  }
  render() {
    return (
      <form onSubmit={this.submit.bind(this)}>
        <label>
          Name: <input type="text" ref={input => this.textInput = input} />
        </label>
        <input type="submit" value="submit" />
      </form>
      )
  }
}

export default App
