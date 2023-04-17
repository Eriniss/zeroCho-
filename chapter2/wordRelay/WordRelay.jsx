const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [ word, setWord ] = React.useState("박하사탕");
  const [ value, setValue] = React.useState("");
  const [ result, setResult ] = React.useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault(); // submit이 작동할 시 새로고침을 하는것을 막아준다.
    if (word[word.length - 1] === value[0]) {
      setResult("Good job!");
      setValue("");
      setWord(value);
      inputRef.current.focus();
    } else {
      setResult("Wrong word!");
      setValue("");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
    
    return (
      <>
        <h2>{word}</h2>
        <form onSubmit={onSubmitForm}>
          <input ref={inputRef} value={value} onChange={onChangeInput} />
          <button>insert word!</button>
        </form>
        <div>{result}</div>
      </>
    );
}

module.exports = WordRelay;