import React from 'react';
import { useSearchParams } from 'react-router-dom';

import ResetAndDoneBtns from '../../../../../components/ResetAndDoneBtns';

import useFilteredFilters from '../../hooks/useFilteredFilters';
import useChangeFilter from '../../hooks/useChangeFilter';

import CheckSVG from '../../../../../icons/Check';

import styles from './styles.module.scss';

interface Props {
  param: string;
  list: 1 | 2;
  closeFilter: () => void;
}

export default function CheckFilter({ param, list, closeFilter }: Props): React.ReactElement {
  const filterList = useFilteredFilters(list);
  const changeFilter = useChangeFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParam = searchParams.get(param);

  const resetFilter = () => {
    searchParams.delete(param);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {filterList.map((filter, index) => (
          <button
            onClick={() => changeFilter({ filterList, index, param })}
            className={
              filterParam?.split(' ').find((filterParams) => filterParams === filter.name.replace(/ /g, '_'))
                ? `${styles.button} ${styles.button__active}`
                : styles.button
            }
            key={index}>
            <span className={styles.button__check}>
              <CheckSVG />
            </span>
            {filter.name} <span style={{ color: '#646464' }}>{filter.quantity}</span>
          </button>
        ))}
      </div>

      <ResetAndDoneBtns condition={!!filterParam} resetFunc={resetFilter} doneFunc={closeFilter} />
    </div>
  );
}
