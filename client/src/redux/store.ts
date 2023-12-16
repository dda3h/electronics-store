import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import itemsSlice from './reducers/items/slice'
import cartSlice from './reducers/cart/slice'
import userSlice from './reducers/user/slice'

const store = configureStore({
	reducer: {
		items: itemsSlice,
		cart: cartSlice,
		user: userSlice
	}
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export type RootState = ReturnType<typeof store.getState>

export default store
