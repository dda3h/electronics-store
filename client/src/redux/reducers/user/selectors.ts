import { RootState } from '../../store';

export const getUser = (state: RootState) => state.user.user;
export const getIsLogged = (state: RootState) => state.user.isLogged;
