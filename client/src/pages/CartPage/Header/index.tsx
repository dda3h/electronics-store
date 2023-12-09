import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../redux/reducers/cart/slice';
import { getCartItemsQuantity } from '../../../redux/reducers/cart/selectors';

import CartSVG from '../../../icons/Cart';
import TrashSVG from '../../../icons/Trash';

import styles from './styles.module.scss';

export default function Header(): React.ReactElement {
  const dispatch = useDispatch();

  const itemsQuantity = useSelector(getCartItemsQuantity);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <CartSVG className={styles.logo__svg} />

        <h1 className={styles.logo__title}>
          Cart<span>{itemsQuantity}</span>
        </h1>
      </div>

      <button onClick={() => dispatch(clearCart())} className={styles.clear}>
        <TrashSVG className={styles.clear__svg} />

        <h1 className={styles.clear__title}>Clear cart</h1>
      </button>
    </div>
  );
}
