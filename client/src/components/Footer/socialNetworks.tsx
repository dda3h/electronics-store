import { TelegramSVG, GitHubSVG } from '../../icons'
import styles from './Footer.module.scss'

export const socialNetworks = [
	{
		label: 'Telegram',
		link: 'https://t.me/j9477',
		icon: <TelegramSVG className={styles.socialNetworks__icon} />
	},
	{
		label: 'GitHub',
		link: 'https://github.com/dda3h',
		icon: <GitHubSVG className={styles.socialNetworks__icon} />
	}
]
