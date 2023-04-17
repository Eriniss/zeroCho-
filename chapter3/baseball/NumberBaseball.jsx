import React, {useRef, useState, useCallback} from 'react';
import Try from "./Try";

const getNumbers = () => { // 숫자의 초기값 설정 함수
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers); // 숫자 초기값 설정. useState에 함수값이 들어갈 경우 ()를 생략하여 연산을 생략하고(처음 값만 연산함) 리턴값만 사용한다.
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]); // 시도했던 숫자들 배열 형태로 저장한다. 초기값은 빈배열.
  const inputEl = useRef(null);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (value === answer.join('')) { // 숫자를 맞출 시
      setTries((t) => ([
        ...t,
        {
          try: value,
          result: '홈런!',
        }
      ]));
      setResult('홈런!');
      alert('게임을 다시 실행합니다.');
      setValue('');
      setAnswer(getNumbers()); // 숫자를 맞췄으므로 초기화
      setTries([]); // 역시 숫자를 맞췄으므로 배열 초기화
      inputEl.current.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v)); // 데이터를 쪼갠 뒤 숫자로 치환
      let strike = 0; // 다시 스트라이크 값을 0으로 초기화
      let ball = 0; // 다시 볼 값을 0으로 초기화
      if (tries.length >= 9) { 
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers()); // 위의 로직과 동일
        setTries([]); // 위의 로직과 동일
        inputEl.current.focus();
      } else {
        console.log('답은', answer.join(''));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) { // 배열의 값과 위치가 동일할 시 strike +1
            console.log('strike', answerArray[i], answer[i]);
            strike += 1;
          } else if (answer.includes(answerArray[i])) { // 배열의 값은 같으나 위치가 다를 시 ball +1
            console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
            ball += 1;
          }
        }
        setTries(t => ([
          ...t,
          {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          }
        ]));
        setValue(''); // 내가 제시한 숫자값 초기화
        inputEl.current.focus();
      }
    }
  }, [value, answer]);

  const onChangeInput = useCallback((e) => setValue(e.target.value), []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;