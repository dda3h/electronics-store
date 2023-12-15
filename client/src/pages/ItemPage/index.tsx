import React from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { fetchItems } from '../../redux/reducers/items/asyncActions';
import { addItem } from '../../redux/reducers/cart/slice';
import { getItemsArray, getItemsStatus } from '../../redux/reducers/items/selectors';
import { getCartItemList } from '../../redux/reducers/cart/selectors';
import { Status } from '../../types';

import styles from './styles.module.scss';

export default function ItemPage(): React.ReactElement {
  const params = useParams();
  const dispatch = useAppDispatch();

  const item = useSelector(getItemsArray).find((item) => item.id === Number(params.id));
  const status = useSelector(getItemsStatus);

  const cartItems = useSelector(getCartItemList);
  const itemCartQuantity = cartItems.find((cartItem) => cartItem.id === item?.id)?.quantity;

  React.useEffect(() => {
    dispatch(fetchItems());
  }, []);

  if (status === Status.REJECTED) return <h1 className={styles.statusHeader}>Failed to get the item :(</h1>;
  if (status === Status.PENDING) return <h1 className={styles.statusHeader}>Loading...</h1>;
  if (item === undefined) return <h1 className={styles.statusHeader}>There is no item with ID {params.id}</h1>;

  return (
    <>
      <h1 className={styles.pathHeader}>{item.category}</h1>

      <div className={styles.blockWrapper}>
        <img src={item.image} alt={item.title} className={styles.image} />

        <div className={styles.block}>
          <div className={`${styles.block__section} ${styles.title}`}>
            <h1 className={styles.title__text}>{item.title}</h1>
          </div>

          <p className={`${styles.block__section} ${styles.description}`}>{item.description}</p>
        </div>

        <div className={styles.blockInfo}>
          <h1 className={styles.block__section}>Brand: {item.brand}</h1>

          <h1 className={styles.block__section}>
            ⭐️ {item.rating} ({item.reviewsQuantity} reviews) {item.purchaseQuantity} bought
          </h1>

          <h1 className={styles.block__section}>${item.price}</h1>

          <div className={`${styles.buttons} ${styles.block__section}`}>
            <button onClick={() => dispatch(addItem(item))} className={`${styles.button} ${styles['button--cart']}`}>
              Add to cart
              {itemCartQuantity && (
                <span>
                  <i>{itemCartQuantity}</i>
                </span>
              )}
            </button>

            <button className={`${styles.button} ${styles['button--buy']}`}>Buy now</button>
          </div>
        </div>
      </div>
    </>
  );
}
