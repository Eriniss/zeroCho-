// import React, { Component } from 'react';

// class CheckReaction extends Component {
//   state = {
//     state: 'waiting',
//     message: '클릭해서 시작하세요',
//     result: [],
//   };

//   timeout;
//   startTime;
//   endTime;

//   onClickScreen = () => {
//     const { state, message, result } = this.state;
//     if (state === 'waiting') {
//       this.setState({
//         state: 'ready',
//         message: '초록색이 되면 클릭하세요.',
//       });
//       this.timeout = setTimeout(() => {
//         this.setState({
//           state: 'now',
//           message: '지금 클릭',
//         });
//         this.startTime = new Date();
//       }, Math.floor(Math.random() * 1000) + 2000); // 2초와 3초 사이
//     } else if (state == 'ready') {
//       clearTimeout(this.timeout);
//       this.setState({
//         state: 'waiting',
//         message: '성급하게 클릭하셨네요'
//       });
//     } else if (state === 'now') {
//       this.endTime = new Date();
//       this.setState((prevState) => {
//         return {
//           state: 'waiting',
//           message: '클릭해서 시작하세요.',
//           result: [...prevState.result, this.endTime - this.startTime]
//         }
//       });
//     }
//   };

//   renderAverage = () => {
//     this.state.result.length === 0 
//           ? null
//           : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
//   }

//   render() {
//     const { state, message } = this.state;

//     return(
//       <>
//         <div
//           id='screen'
//           className={this.state.state}
//           onClick={this.onClickScreen}
//         >
//           {this.state.message}
//         </div>
//         {this.renderAverage()}
//       </>
//     )
//   }
// }

// export default CheckReaction;

import React, { useState, useCallback, useRef } from 'react';

const CheckReaction = () => {
  const [ state, setState ] = useState('waiting');
  const [ message, setMessage ] = useState('Start to click');
  const [ result, setResult ] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('Waiting...');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('Now!');
        startTime.current = new Date();
      }, 2500);
    } else if (state === 'ready') {
      setState('waiting');
      setMessage('Too soon, let\'s try again!')
    } else if (state === 'now') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('Start to click');
      endTime.current = new Date();
      setResult((prevResult) => {
        return [ ...prevResult, endTime.current - startTime.current];
      });
    }
  }

  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <div>Average time: {result.reduce((a, c) => a + c) / result.length}ms</div>
  }

  return (
    <>
      <div
        id='screen'
        className={state}
        onClick={onClickScreen}
      >
      {message}
      </div>
      <button type='reset' onClick={onReset}>Reset</button>
      {renderAverage()}
      <ol>
        {result.map((item, index) => (
         <li key={index}>{item}</li>
        ))}
      </ol>
    </>
  );
}

export default CheckReaction;