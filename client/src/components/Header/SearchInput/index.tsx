import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import SearchSVG from '../../../icons/Search'
import CloseSVG from '../../../icons/Close'

import styles from './styles.module.scss'

export default function Search(): React.ReactElement {
	const [inputValue, setInputValue] = React.useState('')

	const searchInputRef = React.useRef<HTMLInputElement>(null)

	const navigate = useNavigate()
	const location = useLocation()
	const [searchParams] = useSearchParams()

	const query = searchParams.get('query') || ''

	function clearInput() {
		setInputValue('')
		searchInputRef.current?.focus()
	}

	function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
		if (!inputValue?.trim()) return navigate('/')

		event.currentTarget.blur()

		const spacelessValue = inputValue.replace(/\s+/g, ' ').trim()
		const uriQuery = encodeURIComponent(spacelessValue).replace(/%20/g, '+')

		setInputValue(spacelessValue)

		navigate(`/search?query=${uriQuery}`)
	}

	React.useEffect(() => {
		setInputValue(location.pathname === '/search' ? query : '')
	}, [location.pathname])

	return (
		<div className={styles.wrapper}>
			<SearchSVG className={styles.searchSvg} />

			<input
				type='text'
				ref={searchInputRef}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
				className={styles.input}
				placeholder='Search...'
			/>

			{inputValue && (
				<div onClick={clearInput}>
					<CloseSVG className={styles.closeSvg} />
				</div>
			)}
		</div>
	)
}
