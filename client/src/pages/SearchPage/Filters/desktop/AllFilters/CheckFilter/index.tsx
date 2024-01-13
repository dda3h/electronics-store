import { useSearchParams } from 'react-router-dom'

import useFilteredFilters from '../../../hooks/useFilteredFilters'
import useChangeFilter from '../../../hooks/useChangeFilter'

import { CheckSVG } from '../../../../../../icons'

import styles from './CheckFilter.module.scss'

interface Props {
	param: string
	list: 1 | 2
}

export default function CheckFilter({ param, list }: Props) {
	const filterList = useFilteredFilters(list)
	const changeFilter = useChangeFilter()
	const [searchParams] = useSearchParams()

	const filterParams = searchParams.get(param)

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
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
						<span className={styles.button__check}>
							<CheckSVG />
						</span>
						{filter.name}{' '}
						<span style={{ color: '#646464' }}>{filter.quantity}</span>
					</button>
				))}
			</div>
		</div>
	)
}
