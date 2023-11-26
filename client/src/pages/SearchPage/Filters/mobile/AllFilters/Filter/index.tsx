import React from 'react';
import { useSearchParams } from 'react-router-dom';

import useFilteredFilters from '../../../hooks/useFilteredFilters';
import useChangeFilter from '../../../hooks/useChangeFilter';

import styles from './styles.module.scss';

interface Props {
  param: string;
  list: 1 | 2;
}

export default function Filter({ param, list }: Props): React.ReactElement {
  const filterList = useFilteredFilters(list);
  const changeFilter = useChangeFilter();
  const [searchParams] = useSearchParams();

  const filterParams = searchParams.get(param);

  return (
    <div className={styles.wrapper}>
      {filterList.map((filter, index) => (
        <button
          onClick={() => changeFilter({ filterList, index, param })}
          className={
            filterParams?.split(' ').find((filterParam) => filterParam === filter.name.replace(/ /g, '_'))
              ? `${styles.button} ${styles.button__active}`
              : styles.button
          }
          key={index}>
          {filter.name} <span style={{ color: '#646464' }}>{filter.quantity}</span>
        </button>
      ))}
    </div>
  );
}
