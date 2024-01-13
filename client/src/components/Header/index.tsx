import { Link } from 'react-router-dom'

import Search from './SearchInput'
import NavBar from './NavBar'

import styles from './Header.module.scss'

export default function Header() {
	return (
		<header className={styles.wrapper}>
			<button className={styles.logo}>
				<Link to='/'>BestLogoEver</Link>
			</button>

			<Search />

			<NavBar />
		</header>
	)
}
