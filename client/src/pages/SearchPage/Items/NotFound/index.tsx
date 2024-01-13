import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './NotFound.module.scss'

export default function NotFound() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const query = searchParams.get('query') || ''

	function resetFilters() {
		const uriQuery = encodeURIComponent(query.replace(/\s+/g, ' ').trim()).replace(
			/%20/g,
			'+'
		)
		navigate(`/search?query=${uriQuery}`)
	}

	return (
		<>
			<h1 className={styles.notFoundHeader}>No matching products found.</h1>
			<p className={styles.notFoundTip}>
				Try changing or <span onClick={resetFilters}>resetting the filters.</span>
			</p>
		</>
	)
}
