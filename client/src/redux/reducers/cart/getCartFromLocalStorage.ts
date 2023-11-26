import { TItem } from '../../../types';

export default function getCartFromLocalStorage() {
  const data = localStorage.getItem('cart');

  const items = data ? JSON.parse(data) : [];

  const totalPrice = data
    ? JSON.parse(data).reduce((sum: number, item: TItem) => sum + item.price * (item.quantity || 0), 0)
    : 0;

  const itemsQuantity = data ? JSON.parse(data).reduce((sum: number, item: TItem) => sum + (item.quantity || 0), 0) : 0;

  return { items, totalPrice, itemsQuantity };
}
