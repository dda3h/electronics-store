import { createSlice } from '@reduxjs/toolkit';

import getCartFromLocalStorage from './getCartFromLocalStorage';

import { CartState } from './types';

const initialState: CartState = {
  items: getCartFromLocalStorage().items,
  totalPrice: getCartFromLocalStorage().totalPrice,
  itemsQuantity: getCartFromLocalStorage().itemsQuantity,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.items.find((item) => item.id === action.payload.id);

      if (itemInCart) itemInCart.quantity++;
      else state.items.unshift({ ...action.payload, quantity: 1 });

      state.totalPrice += action.payload.price;
      state.itemsQuantity += 1;
    },

    subItem: (state, action) => {
      const itemInCart = state.items.find((item) => item.id === action.payload.id);

      if (itemInCart) itemInCart.quantity--;

      state.totalPrice -= action.payload.price;
      state.itemsQuantity -= 1;
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      state.totalPrice -= action.payload.price * action.payload.quantity;
      state.itemsQuantity -= action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];

      state.totalPrice = 0;
      state.itemsQuantity = 0;
    },
  },
});

export const { addItem, subItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
