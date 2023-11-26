import { RootState } from '../../store';

export const getItemsState = (state: RootState) => state.items;
export const getItemsArray = (state: RootState) => state.items.array;
export const getItemsStatus = (state: RootState) => state.items.status;
