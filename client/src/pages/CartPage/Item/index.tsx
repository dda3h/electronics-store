import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addItem, removeItem, subItem } from '../../../redux/reducers/cart/slice';
import { TItem } from '../../../types';

import styles from './styles.module.scss';

export default function Item(item: TItem & { quantity: number }): React.ReactElement {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Link to={`/item/${item.id}`}>
          <img src={item.image} alt={item.title} className={styles.info__image} />
        </Link>

        <div className={styles.info__text}>
          <h1 className={styles.info__title}>
            <Link to={`/item/${item.id}`}>{item.title}</Link>
          </h1>

          <p className={styles.info__description}>
            <Link to={`/item/${item.id}`}>{item.description}</Link>
          </p>
        </div>
      </div>

      <div className={styles.management}>
        <div className={styles.quantity}>
          <button
            onClick={() => item.quantity > 1 && dispatch(subItem(item))}
            className={`${styles.button} ${item.quantity === 1 ? styles['button--disabled'] : ''}`}>
            <span>-</span>
          </button>

          <h1 style={{ fontWeight: '700' }}>{item.quantity}</h1>

          <button onClick={() => dispatch(addItem(item))} className={styles.button}>
            <span>+</span>
          </button>
        </div>

        <h1 style={{ fontWeight: '700' }}>${item.price}</h1>

        <button onClick={() => dispatch(removeItem(item))} className={styles.button}>
          <span>x</span>
        </button>
      </div>
    </div>
  );
}
