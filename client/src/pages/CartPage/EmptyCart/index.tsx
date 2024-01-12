import PressButton from '../../../components/PressButton'
import styles from './styles.module.scss'

export default function EmptyCart() {
	return (
		<div className={styles.wrapper}>
			<img src='src/assets/images/empty-cart.png' className={styles.image} />

			<h1 className={styles.header}>
				Looks like your cart is empty
			</h1>
			<h1 className={styles.header}>
				You can go back to the home page and select items you want
			</h1>

			<PressButton text={'Go home'} link='/' />
		</div>
	)
}
