import { useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getItemsArray } from '../../../redux/reducers/items/selectors'

import { TItem } from '../../../types'

export default function useFilteredData(): TItem[] {
	const [searchParams] = useSearchParams()

	const query = searchParams.get('query') || ''
	const sortParam = searchParams.get('sort')?.replace(/_/g, ' ') || 'By popularity'
	const categoryParam = searchParams.get('category')
	const brandParam = searchParams.get('brand')
	const priceParam = searchParams.get('price')

	const data = useSelector(getItemsArray)
		.filter(
			item =>
				item.title.toLowerCase().includes(query?.toLowerCase()) ||
				item.description.toLowerCase().includes(query?.toLowerCase())
		)
		.filter(item =>
			categoryParam
				? categoryParam?.split(' ').includes(item.category.replace(/ /g, '_'))
				: true
		)
		.filter(item =>
			brandParam
				? brandParam?.split(' ').includes(item.brand.replace(/ /g, '_'))
				: true
		)
		.filter(item =>
			priceParam
				? item.price >= Number(priceParam?.split('-')[0]) &&
				  item.price <= Number(priceParam?.split('-')[1])
				: true
		)
		.sort((a, b) => {
			if (sortParam === 'By rating') return b.rating - a.rating
			if (sortParam === 'Cheap first') return a.price - b.price
			if (sortParam === 'Expensive first') return b.price - a.price
			return b.purchaseQuantity - a.purchaseQuantity
		})

	return data
}
