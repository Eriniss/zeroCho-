import React from 'react';
import { useState, useRef } from 'react';

const Baseball = () => {
  const [ result, setResult ] = useState("");
  const [ value, setValue ] = useState("");
  const [ answer, setAnswer ] = useState(getNumbers());
  const [ tries, useTries ] = useState(0);

  const getNumbers = () => { // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수

  }
  
  const onSubmitForm = () => {
  
  }

  const onChangeInput = (e) => {
    e.target.value
  }

  return (
    <>
      <div>{result}</div>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput}></input>
        <button></button>
      </form>
      <div>Tries count:{tries.length}</div>
      <ul>
        {['사과', '배', '귤', '포도', '딸기'].map((v, i) => { // map 함수는 리액트 내에서 반복문을 담당한다.
          return (
            <li key={v}>{v}</li> // 리액트 내에 반복문을 사용할때는 key가 필요하다. key는 데이터의 고유 값이며 반드시 반복을 피해야 한다.
            // key={i}는 가급적 피하는것이 좋다. 기술적 성능문제를 불러올 수 있다.
          );
        })}
      </ul>
    </>
  )
}

export default Baseball; // 디폴트로 가져오면 import에 {}을 사용하지 않는다.
// export const hello = 'hello'; 이런식으로 디폴트를 사용하지 않으면 import { hello } 처럼 {}을 사용 해준다.