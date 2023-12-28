import React from 'react'
import { socialNetworks } from './socialNetworks'
import styles from './styles.module.scss'

export default function Footer(): React.ReactElement {
	return (
		<footer className={styles.wrapper}>
			<h1 className={styles.header}>Contact me</h1>

			<div className={styles.socialNetworks}>
				{socialNetworks.map((network, index) => (
					<a href={network.link} target="_blank" key={index}>
						{network.icon}
					</a>
				))}
			</div>

			<h1 className={styles.text}>
				1912-2036 &copy; nentennens <br /> All rights unguarded.
			</h1>
		</footer>
	)
}
