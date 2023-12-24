import { $api } from '../axios'
import { TCartList } from '../types'

export async function getCart(userId: number) {
	const response = await $api.get<TCartList>('/cart/getCart', { params: { userId } })
	return response.data
}

export async function addItem(userId: number, itemId: number, itemQuantity: number) {
	await $api.post('/cart/addItem', { userId, itemId, itemQuantity })
}

export async function incrementItem(userId: number, itemId: number) {
	await $api.put('/cart/incrementItem', { userId, itemId })
}

export async function decrementItem(userId: number, itemId: number) {
	await $api.put('/cart/decrementItem', { userId, itemId })
}

export async function removeItem(userId: number, itemId: number) {
	await $api.delete('/cart/removeItem', { params: { userId, itemId } })
}

export async function clearCart(userId: number) {
	await $api.delete('/cart/clearCart', { params: { userId } })
}
