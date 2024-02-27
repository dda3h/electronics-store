import { useDispatch, useSelector } from 'react-redux'

import { clearCart } from '../../../redux/reducers/cart/slice'
import { getCartItemsQuantity } from '../../../redux/reducers/cart/selectors'
import { getIsLogged, getUser } from '../../../redux/reducers/user/selectors'

import { CartService } from '../../../services'

import { CartSVG, TrashSVG } from '../../../icons'

import styles from './Header.module.scss'

export default function Header() {
	const dispatch = useDispatch()

	const itemsQuantity = useSelector(getCartItemsQuantity)

	const { id: userId } = useSelector(getUser)
	const isLogged = useSelector(getIsLogged)

	function onClearCart() {
		dispatch(clearCart())
		if (isLogged) CartService.clearCart(userId)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>
				<CartSVG className={styles.logo__svg} />

				<h1 className={styles.logo__title}>
					Cart <span>{itemsQuantity}</span>
				</h1>
			</div>

			<button onClick={onClearCart} className={styles.clear}>
				<TrashSVG className={styles.clear__svg} />

				<h1 className={styles.clear__title}>Clear cart</h1>
			</button>
		</div>
	)
}
