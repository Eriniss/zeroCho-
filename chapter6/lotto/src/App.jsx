import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './components/Ball';
import style from './App.css';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((_, i) => i + 1); // 1부터 45까지의 배열 반환한다.
  const shuffle = []; // 섞은 배열 중 숫자 7개 추출할 예정
  while (candidate.length > 0) { // 배열 45개가 모두 뽑힐 때까지 무작위로 숫자들을 suffle에 push한다.
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1]; // 배열의 제일 끝 숫자 추출
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 배열 0부터 5까지, 총 6개의 숫자 추출
  return [...winNumbers, bonusNumber]; // 추출한 숫자들을 하나의 배열로 조합한다.
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 7개의 숫자를 디폴트값으로 설정
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) { // 총 6번의 setTimeout을 사용한다.
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 500);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 3500);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  // useEffect는 
  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {/* value값을 각각 key와 number에 배정 */}
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;