import { useSearchParams } from 'react-router-dom'

import Item from './Item'
import Pagination from './Pagination'
import NotFound from './NotFound'

import useFilteredData from './useFilteredData'

import styles from './Items.module.scss'

export default function Items() {
	const data = useFilteredData()
	const [searchParams] = useSearchParams()

	const itemsPerPage = 5
	const pageCount = Math.ceil(data.length / itemsPerPage)
	const currentPage = Number(searchParams.get('page')) || 1
	const lastIndex = currentPage * itemsPerPage
	const firstIndex = lastIndex - itemsPerPage
	const items = data.slice(firstIndex, lastIndex)

	if (!data.length) return <NotFound />

	return (
		<div className={styles.wrapper}>
			{items.map((item, i) => (
				<Item {...item} key={i} />
			))}

			{pageCount > 1 && <Pagination pageCount={pageCount} />}
		</div>
	)
}
