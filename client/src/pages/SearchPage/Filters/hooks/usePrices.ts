import { useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getItemsArray } from '../../../../redux/reducers/items/selectors'

export default function usePrices() {
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')
  const categoryParam = searchParams.get('category')
  const brandParam = searchParams.get('brand')

  const data = useSelector(getItemsArray)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query?.toLowerCase() || '') ||
        item.description.toLowerCase().includes(query?.toLowerCase() || '')
    )
    .filter((item) => (categoryParam ? categoryParam?.split(' ').includes(item.category.replace(/ /g, '_')) : true))
    .filter((item) => (brandParam ? brandParam?.split(' ').includes(item.brand.replace(/ /g, '_')) : true))
    .sort((a, b) => a.price - b.price)

  const minPrice = String(data[0]?.price)
  const maxPrice = String(data[data.length - 1]?.price)

  return [minPrice, maxPrice]
}
