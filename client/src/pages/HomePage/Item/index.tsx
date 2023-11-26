import React from 'react';
import { Link } from 'react-router-dom';

import { TItem } from '../../../types.js';

import styles from './styles.module.scss';

export default function Item(item: TItem): React.ReactElement {
  return (
    <Link to={`/item/${item.id}`} className={styles.wrapper}>
      <img src={item.image} alt={item.title} className={styles.image} />

      <div className={styles.wrapper__text}>
        <h1 className={styles.title}>
          {item.title} <span className={styles.description}> / {item.description}</span>
        </h1>

        <p className={styles.rating}>
          ⭐️ {String(item.rating).indexOf('.') === -1 ? <span>{item.rating}.0</span> : item.rating}{' '}
          <span className={styles.rating__quantity}>&middot; {item.reviewsQuantity} reviews</span>
        </p>

        <p className={styles.price}>${item.price}</p>
      </div>
    </Link>
  );
}
