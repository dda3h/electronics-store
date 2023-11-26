import { TItem } from '../../../types';

export interface CartState {
  items: (TItem & { quantity: number })[];
  totalPrice: number;
  itemsQuantity: number;
}
