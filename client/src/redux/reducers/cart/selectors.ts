import { RootState } from '../../store';

export const getCartState = (state: RootState) => state.cart;
export const getCartItems = (state: RootState) => state.cart.items;
export const getCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const getCartItemsQuantity = (state: RootState) => state.cart.itemsQuantity;
