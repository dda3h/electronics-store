import { TItem } from '../../../types'

export default function getCartFromLocalStorage() {
	const data = localStorage.getItem('cart')

	const itemList = data ? JSON.parse(data) : []
	const itemsQuantity = data
		? JSON.parse(data).reduce(
				(sum: number, item: TItem) => sum + (item.quantity || 0),
				0
		  )
		: 0

	return { itemList, itemsQuantity }
}
