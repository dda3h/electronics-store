import { TelegramSVG, GitHubSVG } from '../../icons'
import styles from './Footer.module.scss'

export const socialNetworks = [
	{
		label: 'Telegram',
		link: 'https://t.me/nentennens',
		icon: <TelegramSVG className={styles.socialNetworks__icon} />
	},
	{
		label: 'GitHub',
		link: 'https://github.com/nentennens',
		icon: <GitHubSVG className={styles.socialNetworks__icon} />
	}
]
