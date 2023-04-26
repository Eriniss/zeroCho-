import { useState, useCallback, useEffect } from 'react';

const App = () => {
  const [toDoLists, setToDoLists] = useState([]);
  const [textValue, setTextValue] = useState('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setToDoLists((data) => [...data, textValue]);
    setTextValue('');
  }, [textValue]);

  const onChangeTextValue = useCallback((e) => {
    setTextValue(e.currentTarget.value);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input placeholder='여기에 입력하세요' onChange={onChangeTextValue} value={textValue} />
        <button type='submit'>제출</button>
      </form>
      <ul>
        {toDoLists.map((item, index) => (
          <li key={index}>
            <input type='checkbox' />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;