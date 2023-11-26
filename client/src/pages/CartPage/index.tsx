import React from 'react';

import { useSelector } from 'react-redux';
import { getCartState } from '../../redux/reducers/cart/selectors';

import EmptyCart from './EmptyCart';
import Header from './Header';
import Item from './Item';

import styles from './styles.module.scss';

export default function CartPage(): React.ReactElement {
  const { items, totalPrice, itemsQuantity } = useSelector(getCartState);

  if (!items.length) return <EmptyCart />;

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.items}>
        {items.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>

      <button className={styles.buyButton}>
        Checkout
        <span>
          {itemsQuantity} items ${totalPrice}
        </span>
      </button>
    </div>
  );
}
