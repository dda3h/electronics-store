import React from 'react';
import { $api } from '../../axios';

import { useSelector } from 'react-redux';
import { getCartState } from '../../redux/reducers/cart/selectors';

import EmptyCart from './EmptyCart';
import Header from './Header';
import Item from './Item';

import { TItem } from '../../types';

import styles from './styles.module.scss';

export default function CartPage(): React.ReactElement {
  const { itemList, itemsQuantity } = useSelector(getCartState);

  const [itemsData, setItemsData] = React.useState<(TItem & { quantity: number })[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const totalPrice = itemsData.reduce((sum: number, item: TItem) => sum + item.price * (item.quantity || 0), 0);

  React.useEffect(() => {
    const fetchCartItems = async () => {
      const promises = itemList.map(async (item) => {
        const response = await $api.get(`http://localhost:5000/items/${item.id}`);
        return { ...response.data, quantity: item.quantity };
      });

      const resolvedData = await Promise.all(promises);

      setItemsData(resolvedData);
      setIsLoading(false);
    };

    fetchCartItems();
  }, [itemList]);

  if (isLoading) return <h1 className={styles.statusHeader}>Loading...</h1>;
  if (!itemsData.length) return <EmptyCart />;

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.items}>
        {itemsData.map((item, index) => (
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
