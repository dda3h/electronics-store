import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import PriceFilter from './Price'
import Filter from './Filter'

import useFilteredFilters from '../../hooks/useFilteredFilters'
import useFilteredData from '../../../Items/useFilteredData'

import CloseSVG from '../../../../../icons/Close'

import styles from './styles.module.scss'

interface Props {
	closeFilter: () => void
	activeFilter: number
	allFiltersIndex: number
}

export default function AllFilters({ closeFilter, activeFilter, allFiltersIndex }: Props) {
	const [searchParams, setSearchParams] = useSearchParams()

	const filtersRef = useRef<HTMLDivElement>(null)
	const [update, setUpdate] = useState(true)

	const priceParam = searchParams.get('price')
	const categoryParam = searchParams.get('category')
	const brandParam = searchParams.get('brand')

	const filterList = [
		{ name: 'Price', param: 'price', condition: priceParam, component: <PriceFilter /> },
		{ name: 'Category', param: 'category', condition: categoryParam, component: <Filter param='category' list={1} /> },
		{ name: 'Brand', param: 'brand', condition: brandParam, component: <Filter param='brand' list={2} /> }
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

	useEffect(() => {
		filtersRef.current?.scrollTo(0, 0)

		if (activeFilter === allFiltersIndex) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = 'auto'
	}, [activeFilter])

	return (
		<div style={activeFilter === allFiltersIndex ? { right: '0' } : { right: '-100%' }} className={styles.wrapper}>
			<div className={styles.header}>
				<h1 className={styles.header__text}>Filters</h1>

				<div className={styles.header__reset}>
					{(!!priceParam || !!categoryParam || !!brandParam) && (
						<button onClick={onClickReset} className={styles.nameAndReset__button}>
							Reset all
						</button>
					)}

					<button onClick={closeFilter} className={styles.header__button}>
						<CloseSVG className={styles['header__button-icon']} />
					</button>
				</div>
			</div>

			<div ref={filtersRef} className={styles.filters}>
				{filterList.map(
					(filter, i) =>
						// eslint-disable-next-line react-hooks/rules-of-hooks
						(i === 1 || i === 2 ? !!useFilteredFilters(i).length : true) && (
							<div className={styles.filter} key={i}>
								<div className={styles.nameAndReset}>
									<h1 className={styles.nameAndReset__name}>{filter.name}</h1>

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
				<button onClick={onClickDone} className={styles.doneButton}>
					Show {useFilteredData().length} items
				</button>
			</div>
		</div>
	)
}
