import React from 'react'
import { Link } from 'react-router-dom'

import Search from './SearchInput'
import NavBar from './NavBar'

import styles from './styles.module.scss'

export default function Header(): React.ReactElement {
	return (
		<header className={styles.wrapper}>
			<button className={styles.logo}>
				<Link to="/">BestLogoEver</Link>
			</button>

			<Search />

			<NavBar />
		</header>
	)
}
