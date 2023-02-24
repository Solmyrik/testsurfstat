import React from 'react';

import styles from './Table.module.scss';

const Table = ({ itemsWeek, itemsMonth, itemsThreeMonth, count }) => {
  return (
    <div className={styles.table}>
      <div className={styles.table__top}>
        <div className={styles.table__title}>Поисковый запрос</div>
        <div className={styles.table__title}>Количество запросов за неделю</div>
        <div className={styles.table__title}>Количество запросов за 1 месяц</div>
        <div className={styles.table__title}>Количество запросов за 3 месяца</div>
      </div>
      <div className={styles.table__body}>
        {count > 2 ? (
          itemsWeek.map((e, i) => {
            return (
              <div key={e.text} className={styles.table__items}>
                <div className={styles.table__item}>{e.text}</div>
                <div className={styles.table__item}>{e.requestCount}</div>
                <div className={styles.table__item}>{itemsMonth[i]?.requestCount}</div>
                <div className={styles.table__item}>{itemsThreeMonth[i]?.requestCount}</div>
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Table;
