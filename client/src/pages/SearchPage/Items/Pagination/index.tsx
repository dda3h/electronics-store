import { useSearchParams } from 'react-router-dom'

import ThinLeftArrow from '../../../../icons/arrows/ThinLeftArrow'
import ThinRightArrow from '../../../../icons/arrows/ThinRightArrow'

import styles from './styles.module.scss'

export default function Pagination({ pageCount }: { pageCount: number }) {
	const [searchParams, setSearchParams] = useSearchParams()

	const currentPage = Number(searchParams.get('page')) || 1
	const allNumbers = [...Array(pageCount + 1).keys()].slice(1)
	const firstIndex = currentPage > 2 ? (currentPage > pageCount - 2 ? pageCount - 5 : currentPage - 3) : 0
	const lastIndex = currentPage > 2 ? currentPage + 2 : 5
	const numbers = allNumbers.slice(firstIndex, lastIndex)

	function prevPage() {
		if (currentPage === 1) return

		searchParams.set('page', String(currentPage - 1))
		setSearchParams(searchParams)
	}

	function nextPage() {
		if (currentPage === pageCount) return

		searchParams.set('page', String(currentPage + 1))
		setSearchParams(searchParams)
	}

	function changePage(number: number) {
		searchParams.set('page', String(number))
		setSearchParams(searchParams)
	}

	return (
		<div className={styles.wrapper}>
			<button
				onClick={prevPage}
				className={`${styles.button} ${styles.borderless} ${
					currentPage === 1 ? styles['button--disabled'] : ''
				}`}
			>
				<ThinLeftArrow
					className={`${styles['button-arrow']} ${currentPage === 1 ? styles['button--disabled'] : ''}`}
				/>
			</button>

			<div className={styles.numbers}>
				{(allNumbers.length > 5 ? numbers : allNumbers).map((number, i) => (
					<button
						onClick={() => changePage(number)}
						className={`${styles.button} ${number === currentPage ? styles['button--active'] : ''}`}
						key={i}
					>
						{number}
					</button>
				))}
			</div>

			<button
				onClick={nextPage}
				className={`${styles.button} ${styles.borderless} ${
					currentPage === pageCount ? styles['button--disabled'] : ''
				}`}
			>
				<ThinRightArrow
					className={`${styles['button-arrow']} ${
						currentPage === pageCount ? styles['button--disabled'] : ''
					}`}
				/>
			</button>
		</div>
	)
}
