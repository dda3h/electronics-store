import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import { IUser } from '../../../models/IUser';

const initialState: UserState = {
  user: {} as IUser,
  isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, aciton: { payload: IUser }) => {
      state.user = aciton.payload;
    },

    setIsLogged: (state, action: { payload: boolean }) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setUser, setIsLogged } = userSlice.actions;

export default userSlice.reducer;
