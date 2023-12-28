import TelegramSVG from '../../icons/social/Telegram'
import GitHubSVG from '../../icons/social/GitHub'

import styles from './styles.module.scss'

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
