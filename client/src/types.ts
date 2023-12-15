export enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export type TItem = {
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
  quantity?: number
}

export enum Sorts {
  POPULARITY = 'By popularity',
  RATING = 'By rating',
  CHEAP = 'Cheap first',
  EXPENSIVE = 'Expensive first'
}
