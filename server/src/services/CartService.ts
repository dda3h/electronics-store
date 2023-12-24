import { CartDB } from '../database/index.js'

export async function getCart(userId: number) {
	return await CartDB.getCart(userId)
}

export async function addItem(userId: number, itemId: number, itemQuantity: number) {
	return await CartDB.addItem(userId, itemId, itemQuantity)
}

export async function incrementItem(userId: number, itemId: number) {
	return await CartDB.incrementItem(userId, itemId)
}

export async function decrementItem(userId: number, itemId: number) {
	return await CartDB.decrementItem(userId, itemId)
}

export async function removeItem(userId: number, itemId: number) {
	return await CartDB.removeItem(userId, itemId)
}

export async function clearCart(userId: number) {
	return await CartDB.clearCart(userId)
}
