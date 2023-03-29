const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    text: 'Hello, webpack',
  };

  render() {
    return (
      <div>
        <h2>{this.state.text}</h2>
        <input />
        <p></p>
      </div>
    )
  }
}

module.exports = WordRelay;