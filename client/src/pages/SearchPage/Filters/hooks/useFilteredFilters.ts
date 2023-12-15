import { useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getItemsArray } from '../../../../redux/reducers/items/selectors'

interface FilteredFilters {
  name: string
  quantity: number
}

export default function useFilteredFilters(filter: 1 | 2): FilteredFilters[] {
  const data = useSelector(getItemsArray)
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')
  const categoryParam = filter === 1 ? null : searchParams.get('category')
  const brandParam = filter === 2 ? null : searchParams.get('brand')
  const priceParam = searchParams.get('price')

  const propertyCounts: { [property: string]: number } = data
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query?.toLowerCase() || '') ||
        item.description.toLowerCase().includes(query?.toLowerCase() || '')
    )
    .filter((item) => (categoryParam ? categoryParam?.split(' ').includes(item.category.replace(/ /g, '_')) : true))
    .filter((item) => (brandParam ? brandParam?.split(' ').includes(item.brand.replace(/ /g, '_')) : true))
    .filter((item) =>
      priceParam
        ? item.price >= Number(priceParam?.split('-')[0]) && item.price <= Number(priceParam?.split('-')[1])
        : true
    )
    .reduce(
      (counts: any, obj) => (
        (counts[filter === 1 ? obj.category : obj.brand] = (counts[filter === 1 ? obj.category : obj.brand] || 0) + 1),
        counts
      ),
      {}
    )

  const filteredFilter = Object.entries(propertyCounts).map(([name, quantity]) => ({ name, quantity }))

  return filteredFilter
}
