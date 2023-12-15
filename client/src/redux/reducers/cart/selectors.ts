import { RootState } from '../../store';

export const getCartState = (state: RootState) => state.cart;
export const getCartItemList = (state: RootState) => state.cart.itemList;
export const getCartItemsQuantity = (state: RootState) => state.cart.itemsQuantity;
