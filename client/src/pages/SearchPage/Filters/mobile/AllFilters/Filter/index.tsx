import { useSearchParams } from 'react-router-dom'

import useFilteredFilters from '../../../hooks/useFilteredFilters'
import useChangeFilter from '../../../hooks/useChangeFilter'

import styles from './Filter.module.scss'

interface Props {
	param: string
	list: 1 | 2
}

export default function Filter({ param, list }: Props) {
	const filterList = useFilteredFilters(list)
	const changeFilter = useChangeFilter()
	const [searchParams] = useSearchParams()

	const filterParams = searchParams.get(param)

	return (
		<div className={styles.wrapper}>
			{filterList.map((filter, i) => (
				<button
					onClick={() => changeFilter({ filterList, index: i, param })}
					className={
						filterParams
							?.split(' ')
							.find(filterParam => filterParam === filter.name.replace(/ /g, '_'))
							? `${styles.button} ${styles.button__active}`
							: styles.button
					}
					key={i}
				>
					{filter.name}{' '}
					<span style={{ color: '#646464' }}>{filter.quantity}</span>
				</button>
			))}
		</div>
	)
}
