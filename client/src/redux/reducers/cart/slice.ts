import { createSlice } from '@reduxjs/toolkit'

import getCartFromLocalStorage from './getCartFromLocalStorage'

import { CartState } from './types'

const initialState: CartState = {
	itemList: getCartFromLocalStorage().itemList,
	itemsQuantity: getCartFromLocalStorage().itemsQuantity
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const itemInCart = state.itemList.find(item => item.id === action.payload.id)

			if (itemInCart) itemInCart.quantity++
			else state.itemList.unshift({ id: action.payload.id, quantity: 1 })

			state.itemsQuantity += 1
		},

		subItem: (state, action) => {
			// @ts-ignore
			state.itemList.find(item => item.id === action.payload.id).quantity -= 1
			state.itemsQuantity -= 1
		},

		removeItem: (state, action) => {
			state.itemList = state.itemList.filter(item => item.id !== action.payload.id)
			state.itemsQuantity -= action.payload.quantity
		},

		clearCart: state => {
			state.itemList = []
			state.itemsQuantity = 0
		}
	}
})

export const { addItem, subItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
