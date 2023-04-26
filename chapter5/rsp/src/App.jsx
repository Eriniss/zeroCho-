import { useState, useEffect } from "react";

const RSP = () => {
  const [result, setResult] = useState('');
  const [opponent, setOpponent] = useState('바위');

  const gameValue = ['바위', '가위', '보'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpponent(gameValue[Math.floor(Math.random() * 3)]);
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onClickBtn = (value) => () => {
    clearInterval();
    if (value === opponent) {
      setResult('비겼습니다.');
    } else if (
      (value === '바위' && opponent === '가위') ||
      (value === '가위' && opponent === '보') ||
      (value === '보' && opponent === '바위')
    ) {
      setResult('이겼습니다!');
    } else {
      setResult('졌습니다...');
    }
  }

  return (
    <>
      <h2>{opponent}</h2>
      <div>
        <button id='rock' onClick={onClickBtn('바위')}>바위</button>
        <button id='scissor' onClick={onClickBtn('가위')}>가위</button>
        <button id='paper' onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
    </>
  )
};

export default RSP;
