export enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected'
}

export type TItems = {
	id: number
	image: string
	title: string
	description: string
	category: string
	brand: string
	reviewsQuantity: number
	purchaseQuantity: number
	rating: number
	price: number
}

export type TItem = TItems & {
	quantity: number
}

export type TCartList = {
	id: number
	quantity: number
}[]

export enum Sorts {
	POPULARITY = 'By popularity',
	RATING = 'By rating',
	CHEAP = 'Cheap first',
	EXPENSIVE = 'Expensive first'
}
