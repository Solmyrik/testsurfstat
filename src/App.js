import { useEffect, useRef, useState } from 'react';

function App() {
  const ref = useRef();
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([{ text: 'ok' }]);

  useEffect(() => {
    if (inputValue.length > 1) {
      fetch(
        `https://trending-searches.wb.ru/api?itemsPerPage=1000&offset=0&period=week&query=${inputValue}&sort=desc`,
      )
        .then((res) => res.json())
        .then((data) => setItems(data.data.list));
    }
  }, [inputValue]);

  const onSearch = () => {
    setInputValue(ref.current.value);
  };

  console.log(items);

  return (
    <div className="App">
      <div className="input">
        <input ref={ref} type="text" />
      </div>
      <button onClick={onSearch}>Поиск</button>
      <div>
        {items &&
          items.map((e) => {
            return (
              <p>
                {e.text} {e.requestCount}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default App;
