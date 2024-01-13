import PressButton from '../../components/PressButton'
import styles from './NotFoundPage.module.scss'

export default function NotFoundPage() {
	return (
		<div className={styles.wrapper}>
			<img src='/src/assets/images/404.png' className={styles.image} />

			<h1 className={styles.header}>Sorry, we can't find that page</h1>
			<h1 className={styles.header}>But we still have lots for you to discover</h1>

			<PressButton text={'back to homepage'} link="/" />
		</div>
	)
}
