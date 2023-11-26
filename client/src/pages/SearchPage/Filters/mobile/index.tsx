import React from 'react';
import { useSearchParams } from 'react-router-dom';

import AllFilters from './AllFilters';

import ListSVG from '../../../../icons/List';
import SettingsSVG from '../../../../icons/Settings';

import styles from './styles.module.scss';

interface Props {
  activeFilter: number;
  setActiveFilter: React.Dispatch<React.SetStateAction<number>>;
  allFiltersIndex: number;
}

const sortList = ['By popularity', 'By rating', 'Cheap first', 'Expensive first'];

export default function FiltersMobile({ activeFilter, setActiveFilter, allFiltersIndex }: Props): React.ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryCount = searchParams.get('category')?.split(' ').length;
  const brandCount = searchParams.get('brand')?.split(' ').length;
  const priceCount = searchParams.get('price') ? 1 : null;

  const sortParam = searchParams.get('sort')?.replace(/_/g, ' ') || 'By popularity';

  const [isSortOpen, setIsSortOpen] = React.useState<boolean>(false);

  const toggleSortList = () => {
    setIsSortOpen(!isSortOpen);
  };

  const closeFilters = () => {
    setActiveFilter(0);
    setIsSortOpen(false);
  };

  const changeSort = (index: number) => {
    closeFilters();

    const selectedSort = sortList[index].replace(/ /g, '_');

    searchParams.set('sort', selectedSort);
    setSearchParams(searchParams);
  };

  const openFilters = () => setActiveFilter(allFiltersIndex);

  return (
    <>
      <div className={styles.mobileFilters}>
        <ListSVG className={styles.mobileFilters__displayTypeIcon} />

        <button onClick={toggleSortList} className={styles.mobileSortButton}>
          <span>{sortParam}</span>
        </button>

        <div style={isSortOpen ? { bottom: '0' } : { bottom: '-200%' }} className={styles.sortMenu}>
          <div className={styles.sorts}>
            {sortList.map((sort, index) => (
              <p
                onClick={() => changeSort(index)}
                className={`${styles.sort} ${sortParam === sort ? styles['sort--active'] : ''}`}
                key={index}>
                {sort}
              </p>
            ))}
          </div>

          <button onClick={closeFilters} className={styles.sortDoneButton}>
            Done
          </button>
        </div>

        <div className={styles.allFilters}>
          <button onClick={openFilters} className={styles.allFilters__button}>
            <SettingsSVG className={styles.allFilters__icon} />
            {(categoryCount || brandCount || priceCount) && (
              <span className={styles.filterCount}>
                <span>{(categoryCount || 0) + (brandCount || 0) + (priceCount || 0)}</span>
              </span>
            )}
          </button>

          <AllFilters closeFilter={closeFilters} activeFilter={activeFilter} allFiltersIndex={allFiltersIndex} />

          {activeFilter === allFiltersIndex ||
            (isSortOpen && <div onClick={closeFilters} className={styles.allFilters__overlay} />)}
        </div>
      </div>
    </>
  );
}
