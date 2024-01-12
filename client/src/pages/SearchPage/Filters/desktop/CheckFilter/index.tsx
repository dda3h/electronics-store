import { useSearchParams } from 'react-router-dom'

import ResetAndDoneBtns from '../../../../../components/ResetAndDoneBtns'

import useFilteredFilters from '../../hooks/useFilteredFilters'
import useChangeFilter from '../../hooks/useChangeFilter'

import CheckSVG from '../../../../../icons/Check'

import styles from './styles.module.scss'

interface Props {
	param: string
	list: 1 | 2
	closeFilter: () => void
}

export default function CheckFilter({ param, list, closeFilter }: Props) {
	const filterList = useFilteredFilters(list)
	const changeFilter = useChangeFilter()
	const [searchParams, setSearchParams] = useSearchParams()

	const filterParam = searchParams.get(param)

	function resetFilter() {
		searchParams.delete(param)
		setSearchParams(searchParams)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				{filterList.map((filter, i) => (
					<button
						onClick={() => changeFilter({ filterList, index: i, param })}
						className={
							filterParam
								?.split(' ')
								.find(filterParams => filterParams === filter.name.replace(/ /g, '_'))
								? `${styles.button} ${styles.button__active}`
								: styles.button
						}
						key={i}
					>
						<span className={styles.button__check}>
							<CheckSVG />
						</span>
						{filter.name} <span style={{ color: '#646464' }}>{filter.quantity}</span>
					</button>
				))}
			</div>

			<ResetAndDoneBtns condition={!!filterParam} resetFunc={resetFilter} doneFunc={closeFilter} />
		</div>
	)
}
