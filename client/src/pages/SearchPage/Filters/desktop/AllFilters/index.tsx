import React from 'react'
import { useSearchParams } from 'react-router-dom'

import PriceFilter from './Price'
import CheckFilter from './CheckFilter'

import ResetAndDoneBtns from '../../../../../components/ResetAndDoneBtns'

import useFilteredFilters from '../../hooks/useFilteredFilters'
import useFilteredData from '../../../Items/useFilteredData'

import CloseSVG from '../../../../../icons/Close'

import styles from './styles.module.scss'

interface Props {
	closeFilter: () => void
	activeFilter: number
	allFiltersIndex: number
}

export default function AllFilters({ closeFilter, activeFilter, allFiltersIndex }: Props): React.ReactElement {
	const [searchParams, setSearchParams] = useSearchParams()

	const filtersRef = React.useRef<HTMLDivElement>(null)
	const [update, setUpdate] = React.useState<boolean>(true)

	const priceParam = searchParams.get('price')
	const categoryParam = searchParams.get('category')
	const brandParam = searchParams.get('brand')

	const filterList = [
		{ name: 'Price', param: 'price', condition: priceParam, component: <PriceFilter /> },
		{ name: 'Category', param: 'category', condition: categoryParam, component: <CheckFilter param="category" list={1} /> },
		{ name: 'Brand', param: 'brand', condition: brandParam, component: <CheckFilter param="brand" list={2} /> }
	]

	function deleteParam(param: string) {
		searchParams.delete('page')
		searchParams.delete(param)
		setSearchParams(searchParams)
	}

	function onClickReset() {
		searchParams.delete('price')
		searchParams.delete('category')
		searchParams.delete('brand')
		searchParams.delete('page')
		setSearchParams(searchParams)
	}

	function onClickDone() {
		closeFilter()
		setUpdate(!update)
	}

	React.useEffect(() => {
		filtersRef.current?.scrollTo(0, 0)

		if (activeFilter === allFiltersIndex) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = 'auto'
	}, [activeFilter])

	return (
		<div style={activeFilter === allFiltersIndex ? { right: '0' } : { right: '-100%' }} className={styles.wrapper}>
			<div className={styles.header}>
				<h1 className={styles.header__text}>Filters</h1>

				<button onClick={closeFilter} className={styles.header__button}>
					<CloseSVG className={styles['header__button-icon']} />
				</button>
			</div>

			<div ref={filtersRef} className={styles.filters}>
				{filterList.map(
					(filter, index) =>
						// eslint-disable-next-line react-hooks/rules-of-hooks
						(index === 1 || index === 2 ? !!useFilteredFilters(index).length : true) && (
							<div className={styles.filter} key={index}>
								<div className={styles.nameAndReset}>
									<h1>{filter.name}</h1>

									{filter.condition && (
										<button
											onClick={() => deleteParam(filter.param)}
											className={styles.nameAndReset__button}
										>
											Reset
										</button>
									)}
								</div>

								{filter.component}
							</div>
						)
				)}
			</div>

			<div className={styles.configButtons}>
				<h1 className={styles.configButtons__quantity}>Found {useFilteredData().length} items</h1>

				<ResetAndDoneBtns
					condition={!!priceParam || !!categoryParam || !!brandParam}
					firstButtonName="Reset all"
					resetFunc={onClickReset}
					doneFunc={onClickDone}
				/>
			</div>
		</div>
	)
}
