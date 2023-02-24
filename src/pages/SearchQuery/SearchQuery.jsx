import React, { useState, useRef, useEffect } from 'react';
import Table from '../../components/Table/Table';

import styles from './SearchQuery.module.scss';

const SearchQuery = () => {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [itemsWeek, setItemsWeek] = useState([
    { text: 'ok', week: 'week', oneMonth: 'oneMonth', threeMonth: 'threeMonth' },
  ]);
  const [itemsMonth, setItemsMonth] = useState([{ text: 'ok' }]);
  const [itemsThreeMonth, setItemsThreeMonth] = useState([{ text: 'ok' }]);

  useEffect(() => {
    if (inputValue.length > 1) {
      setCount(0);
      fetch(
        `https://trending-searches.wb.ru/api?itemsPerPage=100&offset=0&period=week&query=${inputValue}&sort=desc`,
      )
        .then((res) => res.json())
        .then(
          (data) => setItemsWeek(data.data.list),
          setCount((count) => count + 1),
        );
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.length > 1) {
      fetch(
        `https://trending-searches.wb.ru/api?itemsPerPage=100&offset=0&period=month&query=${inputValue}&sort=desc`,
      )
        .then((res) => res.json())
        .then(
          (data) => setItemsMonth(data.data.list),
          setCount((count) => count + 1),
        );
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.length > 1) {
      fetch(
        `https://trending-searches.wb.ru/api?itemsPerPage=100&offset=0&period=3month&query=${inputValue}&sort=desc`,
      )
        .then((res) => res.json())
        .then(
          (data) => setItemsThreeMonth(data.data.list),
          setCount((count) => count + 1),
        );
    }
  }, [inputValue]);

  const onSearch = () => {
    setInputValue(ref.current.value);
  };

  console.log(itemsWeek, itemsMonth, itemsThreeMonth);
  return (
    <div className={styles.search}>
      <div className={styles.search__form}>
        <div className={styles.search__input}>
          <input ref={ref} type="text" placeholder="поиск" />
        </div>
        <button onClick={onSearch} className={styles.search__button}>
          Найти
        </button>
      </div>
      <div className={styles.search__table}>
        <Table
          count={count}
          itemsWeek={itemsWeek}
          itemsMonth={itemsMonth}
          itemsThreeMonth={itemsThreeMonth}
        />
      </div>
    </div>
  );
};

export default SearchQuery;
