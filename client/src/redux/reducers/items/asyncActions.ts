import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../../axios';

export const fetchItems = createAsyncThunk('items/fetchItemsStatus', async () => {
  const response = await $api.get('/items');
  return response.data;
});
