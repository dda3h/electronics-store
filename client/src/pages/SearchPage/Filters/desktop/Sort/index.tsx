import { useSearchParams } from 'react-router-dom'
import styles from './styles.module.scss'

const sortList = ['By popularity', 'By rating', 'Cheap first', 'Expensive first']

export default function SortFilter({ closeFilter }: { closeFilter: () => void }) {
	const [searchParams, setSearchParams] = useSearchParams()

	const sortParam = searchParams.get('sort')?.replace(/_/g, ' ') || 'By popularity'

	function changeSort(index: number) {
		closeFilter()

		const selectedSort = sortList[index].replace(/ /g, '_')

		searchParams.set('sort', selectedSort)
		setSearchParams(searchParams)
	}

	return (
		<div className={styles.wrapper}>
			{sortList.map((sort, i) => (
				<button
					onClick={() => changeSort(i)}
					className={`${styles.button} ${sort === sortParam ? styles.button__active : ''}`}
					key={i}
				>
					<span className={styles.button__outerCircle}>
						<span className={styles.button__innerCircle} />
					</span>

					{sort}
				</button>
			))}
		</div>
	)
}
