import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import getPrices from '../../../hooks/usePrices'

import styles from './styles.module.scss'

export default function PriceFilter() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [minPrice, maxPrice] = getPrices()

	const priceParam = searchParams.get('price')

	const [inputFrom, setInputFrom] = useState(minPrice)
	const [inputTo, setInputTo] = useState(maxPrice)

	const [update, setUpdate] = useState(true)

	function changePrices(value: string, type: 'min' | 'max') {
		if (type === 'min') setInputFrom(value)
		if (type === 'max') setInputTo(value)

		setUpdate(!update)
	}

	useEffect(() => {
		const isNotEmpty = inputFrom && inputTo
		const areThereAnyChanges = inputFrom !== minPrice || inputTo !== maxPrice

		if (isNotEmpty && (areThereAnyChanges || priceParam)) {
			searchParams.set('price', `${inputFrom}-${inputTo}`)
			setSearchParams(searchParams)
		}
	}, [update])

	useEffect(() => {
		setInputFrom(priceParam?.split('-')[0].replace(/\D/g, '') || minPrice)
		setInputTo(priceParam?.split('-')[1]?.replace(/\D/g, '') || maxPrice)
	}, [minPrice, maxPrice, window.location.href])

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.inputWrapper}>
					<p style={{ color: '#646464' }}>From</p>

					<input
						type='text'
						value={inputFrom}
						onChange={e =>
							changePrices(e.target.value.replace(/\D/g, ''), 'min')
						}
						className={styles.input}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<p style={{ color: '#646464' }}>To</p>

					<input
						type='text'
						value={inputTo}
						onChange={e =>
							changePrices(e.target.value.replace(/\D/g, ''), 'max')
						}
						className={styles.input}
					/>
				</div>
			</div>
		</>
	)
}
