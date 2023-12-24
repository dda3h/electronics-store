import { createSlice } from '@reduxjs/toolkit'

import { UserState } from './types'
import { IUser } from '../../../models/IUser'

const initialState: UserState = {
	user: {} as IUser,
	isLogged: false,
	isRefreshed: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, aciton: { payload: IUser }) => {
			state.user = aciton.payload
		},

		setIsLogged: (state, action: { payload: boolean }) => {
			state.isLogged = action.payload
		},

		setIsRefreshed: (state, action: { payload: boolean }) => {
			state.isRefreshed = action.payload
		}
	}
})

export const { setUser, setIsLogged, setIsRefreshed } = userSlice.actions

export default userSlice.reducer
