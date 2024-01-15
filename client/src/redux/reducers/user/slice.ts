import { createSlice } from '@reduxjs/toolkit'

import { UserState } from './types'
import { IUser } from '../../../models/IUser'

const initialState: UserState = {
	user: {} as IUser,
	isLogged: false,
	isRefreshed: false,
	error: ''
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
		},

		setError: (state, action: { payload: string }) => {
			state.error = action.payload
		}
	}
})

export const { setUser, setIsLogged, setIsRefreshed, setError } = userSlice.actions

export default userSlice.reducer
