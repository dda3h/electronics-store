import { createSlice } from '@reduxjs/toolkit';

import { fetchItems } from './asyncActions';

import { ItemsState } from './types';
import { Status, TItem } from '../../../types';

const initialState: ItemsState = {
  array: [],
  status: Status.PENDING,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = Status.PENDING;
        state.array = [];
      })
      .addCase(fetchItems.fulfilled, (state, action: { payload: TItem[] }) => {
        state.status = Status.FULFILLED;
        state.array = action.payload.sort((a, b) => b.purchaseQuantity - a.purchaseQuantity);
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = Status.REJECTED;
        state.array = [];
      });
  },
});

export default itemsSlice.reducer;
