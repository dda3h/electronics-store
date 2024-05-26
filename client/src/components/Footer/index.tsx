import { socialNetworks } from './socialNetworks'
import styles from './Footer.module.scss'

export default function Footer() {
	return (
		<footer className={styles.wrapper}>
			<h1 className={styles.header}>Contact me</h1>

			<div className={styles.socialNetworks}>
				{socialNetworks.map((network) => (
					<a href={network.link} target='_blank' key={network.label}>
						{network.icon}
					</a>
				))}
			</div>

			<h1 className={styles.text}>
				1912-2036 &copy; dda3h <br /> All rights unguarded.
			</h1>
		</footer>
	)
}
