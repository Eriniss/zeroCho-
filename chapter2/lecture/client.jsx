const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root')); // webpack에서 babel을 설정해주면 실행이 가능하다.